import { query } from "../database";
export class UserRepository {
  static async getUsers() {
    const queryResult = await query(`SELECT * FROM public."user" ORDER BY last_name`);
    const users = queryResult.rows;
    return users;
  }
  static async editUser({id, profileImageUri}: {id: number, profileImageUri: string}) {
    const queryResult = await query(`UPDATE public."user" SET profile_image_uri = '${profileImageUri}' WHERE id = ${id};`);
  }
}