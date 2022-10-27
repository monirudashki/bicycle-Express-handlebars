const authController = require("express").Router();
const jwt = require("jsonwebtoken");
const { register, login } = require("../services/authServise");
const validator = require('validator');


authController.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authController.post("/login", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  try {
    const result = await login(email, password);
    attachToken(req, res, result);
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Login",
      body: {
        email
      },
      error: [err.message]
    });
  }
});

authController.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

authController.post("/register", async (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  const rePass = req.body.rePass.trim();

  const errors = [];
  try {
    if (username.length < 2 || username.length > 15) {
       errors.push("Username must be between 2 and 15 symbols");
    }
    if(!validator.isEmail(email)) {
       errors.push('Email is not valid');
    }
    if (password != rePass) {
       errors.push("Passwords do not match!");
    }

    if(errors.length > 0) {
      throw errors;
    } 

    const result = await register(
      username,
      email,
      password,
      errors
    );

    if(errors.length > 0) {
      throw errors;
    }
    
    attachToken(req, res, result);
    res.redirect("/");
  } catch (error) { 
    console.log(error);
    res.render("register", {
      title: "Register",
      body: {
        username,
        email
      },
      error
    });
  }
});

authController.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/');
});

async function attachToken(req, res, result) {
  const token = req.jwtSign(result);
  res.cookie("jwt", token, { maxAge: 1400000 });
}

module.exports = authController;