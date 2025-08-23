import express from "express";
const router = express.Router();
import Product from "../models/Product.model";
import Order from "../models/Order.model";
import Ingredient from "../models/Ingredient.model";
import CakeComponent from "../models/CakeComponent.model";

router.post("/products", async (req, res, next) => {
    try {
      const createdProduct = await Product.create({ 
        name: {en: "", pt: ""},
        intro: {en: "", pt: ""},
        description: {en: "", pt: ""},
        serve: {en: "", pt: ""},
        store: {en: "", pt: ""},
        images: [""],
        recipe: [],
        category: "",
        workHours: 0,
        electricityHours: 0,
      })
  
      if (!createdProduct) {
        res.status(404).json({ message: "Product not created" });
        return;
      }
  
      res.status(201).json({ product: createdProduct });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});
  
router.put("/products", async (req, res, next) => {
    try {
      const newData = req.body;
      const { _id } = newData;
  
      const updatedProduct = await Product.findByIdAndUpdate(_id, newData, { new: true })
      
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      await updatedProduct.populate('recipe.ingredient');
  
      res.status(200).json({ product: updatedProduct });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.get("/ingredients", async (req, res, next) => {
    try {
      const ingredients = await Ingredient.find();
      
      if (!ingredients) {
        res.status(404).json({ message: "Ingredients not found" });
        return;
      }
  
      res.status(200).json({ ingredients });
    } catch (err) {
      next(err);
    }
});

router.post("/ingredients", async (req, res, next) => {
    try {
      const createdIngredient = await Ingredient.create({
        supermarket: "",
        brand: "",
        name: "",
        recipeUnits: "",
        pricePerUnit: 0,
        price: 0,
        unitsPerPackage: 0,
        packageUnits: "",
      });
  
      if (!createdIngredient) {
        res.status(404).json({ message: "Ingredient not created" });
        return;
      }
  
      res.status(201).json({ ingredient: createdIngredient });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});
  
router.put("/ingredients", async (req, res, next) => {
    try {
      const newData = req.body;
      const { _id } = newData;
  
      const updatedIngredient = await Ingredient.findByIdAndUpdate(_id, newData, { new: true })
  
      if (!updatedIngredient) {
        res.status(404).json({ message: "Ingredient not found" });
        return;
      }
  
      res.status(200).json({ ingredient: updatedIngredient });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.post("/cakeComponents", async (req, res, next) => {
    try {
      const createdCakeComponent = await CakeComponent.create({ 
        name: {en: "", pt: ""},
        recipe: [],
        category: "",
        workHours: 0,
        electricityHours: 0,
      })

      if (!createdCakeComponent) {
        res.status(404).json({ message: "Cake Component not created" });
        return;
      }

      res.status(201).json({ cakeComponent: createdCakeComponent });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.put("/cakeComponents", async (req, res, next) => {
    try {
      const newData = req.body;
      const { _id } = newData;

      const updatedCakeComponent = await CakeComponent.findByIdAndUpdate(_id, newData, { new: true })

      if (!updatedCakeComponent) {
        res.status(404).json({ message: "Cake Component not found" });
        return;
      }

      await updatedCakeComponent.populate('recipe.ingredient');

      res.status(200).json({ cakeComponent: updatedCakeComponent });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.get("/cakeComponents", async (req, res, next) => {
  try {
    const cakeComponents = await CakeComponent.find().populate('recipe.ingredient');

    if (!cakeComponents) {
      res.status(404).json({ message: "Cake Components not found" });
      return;
    }

    res.status(200).json({ cakeComponents });
  } catch (err) {
    next(err);
  }
});

router.get("/orders", async (req, res, next) => {
    try {
      const orders = await Order.find().populate([
        {
          path: 'items.product', // Populate the 'product' in 'items'
          populate: {
            path: 'recipe.ingredient', // Populate the 'ingredient' in 'recipe'
          },
        },
        {
          path: 'additionalIngredients.ingredient', // Populate the 'ingredient' in 'additionalIngredients'
        }
      ]);
      
      if (!orders) {
        res.status(404).json({ message: "Orders not found" });
        return;
      }
  
      res.status(200).json({ orders });
    } catch (err) {
      next(err);
    }
});

router.post("/orders", async (req, res, next) => {
    try {
      const newOrder = {
        name: "",
        email: "",
        pickup: false,
        shipping: {
            city: "",
            address: "",
            zip: ""
        },
        items: [],
        deliveryDate: new Date(),
        additionalIngredients: [],
      }
  
      const createdOrder = await Order.create(newOrder);
  
      if (!createdOrder) {
        res.status(404).json({ message: "Order not created" });
        return;
      }
  
      res.status(201).json({ order: createdOrder });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.put("/orders", async (req, res, next) => {
    try {
      const data = req.body;
      data.deliveryDate = new Date(data.deliveryDate);
  
      const updatedOrder = await Order.findByIdAndUpdate(data._id, data, { new: true })
  
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      await updatedOrder.populate({
        path: 'items.product', // Populate the 'product' in 'items'
        populate: {
          path: 'recipe.ingredient', // Populate the 'ingredient' in 'recipe'
        },
      })
      await updatedOrder.populate('additionalIngredients.ingredient');
  
      res.status(201).json({ order: updatedOrder });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

export default router;