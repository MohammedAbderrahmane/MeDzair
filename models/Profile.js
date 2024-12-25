import FileSystem from "fs";
import { admin } from "../helpers/helpers.js";
import env from "../helpers/config.js";
import bcrypt from "bcrypt";

const Profile = {
  update: () => {},
  get: () => {},
};

Profile.get = () => ({ username: admin().username, email: admin().email });

Profile.update = (user) => {
  const saltRounds = 10;
  if (user.password) user.password = bcrypt.hashSync(user.password, saltRounds);

  const newAdmin = { ...admin(), ...user };

  console.log(newAdmin);

  FileSystem.writeFileSync(
    `${env.CONF_FOLDER}/${env.CREDENTIALS_FILE_NAME}`,
    JSON.stringify(newAdmin, null, 2)
  );
};

export default Profile;
