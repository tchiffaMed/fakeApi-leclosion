const Queries = require("../queries/user.queries");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
module.exports = {
  userList: async (_req, res, _next) => {
    try {
      const listUser = await Queries.getUserList();
      res.status(200).json({
        status: 200,
        result: listUser,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "failed to find the user list",
      });
    }
  },
  getOneUser: async (req, res, _next) => {
    try {
      const id = req.params.id;
      const user = await Queries.getUserById(id);
      res.status(200).json({
        status: 200,
        result: user,
      });
    } catch (e) {
      res.status(404).json({
        status: 404,
        message: "failed to find the user ",
      });
    }
  },
  signup: (req, res, _next) => {
    const password = req.body.password;
    bcrypt.hash(req.body.password, 8, (err, hash) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: "erreur d'enccryptage password",
        });
      } else {
        const body = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          avatar: req.body.avatar
        };
        Queries.saveNewUser(body).then(() => {

          res.status(200).json({
            status: 200,
            message: "User created",

          })

          // send email to compte validation 

        }).catch((err) => {
          res.status(500).json({
            status: 500,
            message: err.message
          })
        })
      }
    })
  },
  login: (req, res) => {

    const email = req.body.email;
    const logedUser = Queries.getUserByEmail(email)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) {
            res.status(500).json({
              status: 500,
              message: "erreur decryptage du password"
            })
          }
          if (!match) {
            res.status(401).json({
              status: 401,
              message: "mot de passe incorrect"
            })
          }
          const payload = {
            userId: user?._id
          }
          delete payload.password;
          //create token
          const token = jwt.sign(
            payload,
            process.env.SECRET_TOKEN,
            { expiresIn: "72h" }
          )

          const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
          }
          if (process.env.Node_ENV === 'PROD') {
            options.secure = true
          }
          res.status(200).cookie('token', token, options).json({
            success: true,
            token
          })
        })
      })
      .catch((_err) => {
        res.status(401).json({
          status: 401,
          message: "user not found"
        })
      });

  },
  getMe: async (req, res) => {
    const user = await Queries.getUserById(req?.user?._id ?? '')
    res.status(200).json({
      data: user
    })
  }
}
