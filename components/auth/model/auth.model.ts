import connection from "../../../config/dbConfig";

export class authModel {
  public async getUserLogin(data: any) {
    try {
      var sql = "CALL sp_GetUserLogin(?,?,@o_status); select @o_status";

      return new Promise((resolve, reject) => {
        connection.query(
          sql,
          [data.USEREMAILID, data.USERPASSWORD],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  }

  public async registerUser(data: any) {
    try {
      var sql = "CALL sp_registerUser(?,?,?,?,@s); select @s";

      return new Promise((resolve, reject) => {
        connection.query(
          sql,
          [data.USERID, data.USEREMAILID, data.USERPASSWORD, data.USERROLEID],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  }
}
