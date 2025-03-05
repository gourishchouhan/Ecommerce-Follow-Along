import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X, Check, Loader, Trash2 } from "lucide-react"; // Added Trash2 icon
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // Added for delete
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("EditProduct GET Token:", token);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
        });

        if (response.status === 403) {
          setError("You are not authorized to edit this product");
          setTimeout(() => navigate("/my-products"), 3000);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          const product = data.data.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setCategory(product.category);
          setStock(product.stock.toString());
          setExistingImages(product.images);
        } else {
          throw new Error(data.message || "Failed to fetch product");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Error fetching product");
        setTimeout(() => navigate("/my-products"), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    setExistingImages([]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setImages([...images, ...files]);
      setExistingImages([]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      if (!name.trim()) throw new Error("Product name is required");
      if (!description.trim()) throw new Error("Description is required");
      if (!price || isNaN(price) || Number(price) <= 0) throw new Error("Valid price is required");
      if (!category.trim()) throw new Error("Category is required");
      if (!stock || isNaN(stock) || Number(stock) < 0) throw new Error("Valid stock quantity is required");

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category.trim());
      formData.append("stock", stock);
      images.forEach((image) => formData.append("images", image));

      const token = localStorage.getItem("token");
      console.log("EditProduct PUT Token:", token);
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 403) {
        throw new Error("You are not authorized to edit this product");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Product updated successfully!");
        navigate("/my-products");
      } else {
        throw new Error(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setError(err.message || "Error updating product");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        throw new Error("You are not authorized to delete this product");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Product deleted successfully!");
        navigate("/my-products");
      } else {
        throw new Error(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      setError(err.message || "Error deleting product");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-gray-600 border-gray-300 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Product
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-100 disabled:opacity-50"
              disabled={deleteLoading}
              title="Delete Product"
            >
              {deleteLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-md"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-gray-50 text-gray-800 transition-all duration-300"
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-gray-50 text-gray-800 transition-all duration-300 min-h-[100px]"
                required
                placeholder="Describe your product"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-gray-50 text-gray-800 transition-all duration-300"
                  required
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-gray-50 text-gray-800 transition-all duration-300"
                  required
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-gray-50 text-gray-800 transition-all duration-300"
                required
                placeholder="Enter product category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="mb-4">
                {existingImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`relative border-2 border-dashed rounded-md p-6 transition-colors ${
                  dragActive ? "border-gray-800 bg-gray-200" : "border-gray-300 bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleImageChange}
                  multiple
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-10 h-10 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-600">
                    Drag and drop or click to upload new images (optional)
                  </span>
                </label>
              </div>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-md font-medium shadow-md hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              disabled={submitLoading || deleteLoading} // Disable during delete too
            >
              {submitLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EditProduct;