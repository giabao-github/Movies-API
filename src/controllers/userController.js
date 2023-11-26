import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createToken, decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const userSignUp = async (req, res) => {
  let { full_name, email, password } = req.body;

  let checkEmail = await prisma.users.findUnique({
    where: {
      email: email
    }
  })

  if (checkEmail) {
    res.send("This email has already been registered!");
    return;
  }

  let passCrypt = bcrypt.hashSync(password, 10);

  let newData = {
    full_name,
    email,
    password: passCrypt,
    face_app_id: "",
    user_type: "user"
  }

  await prisma.users.create({ data: newData });

  res.send("Sign up successfully!");
}

const userLogin = async (req, res) => {
  let { email, password } = req.body;

  let checkEmail = await prisma.users.findUnique({
    where: {
      email: email
    }
  })

  if (checkEmail) {
    let checkPass = bcrypt.compareSync(password, checkEmail.password);
    if (checkPass) {
      let token = createToken({ checkEmail, password: "" });
      res.send(token);
    } 
    else {
      res.send("Incorrect password!");
    }
  } 
  else {
    res.send("Unregistered email!");
  }
}

const userLoginFacebook = async (req, res) => {
  let { id, name, email } = req.body;

  let newData = {
      full_name: name,
      email,
      face_app_id: id
  }
  let checkUser = await prisma.users.findUnique({
      where: {
          face_app_id: id
      }
  })

  if (!checkUser) {
    await prisma.users.create({ data: newData });
    checkUser = await prisma.users.findUnique({
      where: {
        face_app_id: id
      }
    })
  }
  let token = createToken({ checkEmail: checkUser, password: "" });

  res.send(token);
}

const updateInfo = async (req, res) => {
  let { full_name, email, password } = req.body;
  let { token } = req.headers;

  let userInfo = decodeToken(token);
  let { user_id } = userInfo.data.checkEmail;

  let passCrypt = bcrypt.hashSync(password, 10);

  await prisma.users.update({
    where: {
      user_id: user_id
    },
    data: {
      full_name,
      email,
      password: passCrypt
    }
  })

  res.send("update info");
}

export {
    userLogin,
    userSignUp,
    userLoginFacebook,
    updateInfo
}
