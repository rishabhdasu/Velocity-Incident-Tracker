const User = require("../models/User");
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");

// Register new User with the Organization
exports.registerOrg = async(req, res) => {
    try{
        const {name, email, password, companyName} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "Email already in use"});

        const newOrg = await Organization.create({
            name: companyName,
            slug: companyName.toLowerCase().split(" ").join("-")
        });

        const newUser = await User.create({
            name,
            email,
            password,
            organizationId: newOrg._id,
            role: "admin"
        });

        return res.status(201).json({
            message: "Account created successfully",
            user: newUser.name,
            companyName: newOrg.name
        });
    }
    catch(error) {
        console.error("Registration Error", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
};

// Login User

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email}).populate("organizationId");
        if(!user) return res.status(401).json({message: "Invalid email or password"});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({message: "Invalid email or password"});

        const token = jwt.sign({
            id: user._id, role: user.role, organizationId: user.organizationId
        }, process.env.JWT_SECRET, {expiresIn: "6h"});

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {name: user.name, role: user.role}
        });
    }
    catch(error) {
        console.error("Login Error", error);
        res.statu(500).json({message: "Login failed"});
    }
};

exports.addUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const organizationId = req.user.organizationId;
        const newUser = await User.create({
            name,
            email,
            password, 
            organizationId,
            role: role || "user"
        });
        res.status(201).json({message: "Staff member added"})
    }
    catch(error) {
        console.error("Add User Error", error);
        return res.status(500).json({message: "Unable to add user"})
    }
};