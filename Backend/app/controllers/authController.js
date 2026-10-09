const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const createAuditLog = require("../utils/auditLogger");

class AuthController {
  register = async (req, res) => {
    try {
      const { name, email, password, phone, role, address } = req.body;

      // Check required fields
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email and password are required",
        });
      }

      // Check existing user
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        address,
      });

      await createAuditLog({
        req,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        action: "USER_REGISTER",
        resource: "User",
        resourceId: user._id,
        description: `${user.name} registered successfully`,
        status: "success",
      });

      // Send registration confirmation email
      try {
        await sendEmail(
          user.email,
          "Welcome to Blood Care - Registration Successful",
          `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333;">
            <h2 style="color: #a61f1f;">Welcome to Blood Care!</h2>

            <p>Hello ${user.name},</p>

            <p>Your account has been successfully registered with Blood Care.</p>

            <p>
              <strong>Registered Email:</strong> ${user.email}<br/>
              <strong>Account Role:</strong> ${user.role}
            </p>

            <p>You can now log in using your registered email and password.</p>

            <p>Thank you for joining Blood Care and supporting our mission to save lives.</p>

            <p>Regards,<br/><strong>Blood Care Team</strong></p>
          </div>
        `,
        );
      } catch (emailError) {
        console.error("Registration email failed:", emailError);
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Register Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      await createAuditLog({
        req,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        action: "USER_LOGIN",
        resource: "User",
        resourceId: user._id,
        description: `${user.name} logged in successfully`,
        status: "success",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login Error:", error);

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new AuthController();
