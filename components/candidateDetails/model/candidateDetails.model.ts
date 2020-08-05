import connection from "../../../config/dbConfig";
import * as nodemailer from "nodemailer";
const sgMail = require("@sendgrid/mail");
import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export class CandidateDetailsModel {
  public async addUpdateCandidateDetails(data: any) {
    try {
      var sql =
        "CALL sp_addUpdateCandidateDetailsReview(?,?,?,?,?,?,?,?,?,?,?,@o_status);select @o_status";

      return new Promise((resolve, reject) => {
        //console.log(data);
        connection.query(
          sql,
          [
            +data.ID,
            data.fullName,
            data.Email,
            data.mobile,
            data.address,
            data.CANDIDATECVFILE,
            data.candidateSummary,
            data.CandidateCurrentEmp,
            data.CandidateEduBackup,
            +data.EMPID,
            +data.JOBID,
          ],
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

  public async getCandidateDetailsByCandidateId(data: any) {
    try {
      var sql = "CALL receivepostfromcandidate(?)";

      return new Promise((resolve, reject) => {
        //console.log(data);
        connection.query(sql, [data.EMPID], (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  public async getAllCandidateDetailsList() {
    try {
      var sql = "CALL sp_getAllCandidateDetailsList()";

      return new Promise((resolve, reject) => {
        connection.query(sql, [], (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  public async sendCredentialsForCvUpload(data: any) {
    try {
      //console.log(data);
      sgMail.setApiKey(process.env.API_KEY);
      const msg = {
        to: data.EMPLOYERMAILID,
        from: "surajpratap5singh@gmail.com",
        subject: "Candidate Information Successfully Recieved.",
        //text: "Your CV has been uploaded successfully",
        html: `
        <div>
          <div>
            <h3>For Employer</h3>
          </div>
          <div>
            <span>Candiate Sent you a Job Request.</span>
          </div>
          <div>
            <div>
              <div>Name : ${data.fullName}</div>
              <div>Postion :${data.JOBTITLE.split("~")[0]}</div>
              <div>Job Type : ${data.JOBTYPEID}</div>
              <div>Email : ${data.Email}</div>
              <div>Status : "You have a new job application. 
              Here are the synopsis with resume as attachment for your perusal. 
              All the best in finding your next rockstar".</div>
              <div>Visit : https://www.startupjob.in</div>
            </div>
          </div>
        </div>
    `,

        // html: '<p>Hello  `+data.fullName+` `+data.Email+` `+data.mobile+` `+data.candidateSummary+` `+data.CandidateEduBackup+`
        // </p>'
        // //<br>Your maxIMuS username and password are shown below.<br>,
      };

      await sgMail.send(msg, true, (err: any, result: any) => {
        if (err) {
          return err;
        } else {
          return result;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
