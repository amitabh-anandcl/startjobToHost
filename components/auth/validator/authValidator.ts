import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from "express-validator";

export class AuthValidator {

    constructor() {

    }
    /**
     * Validator to check Input Parmaeter for Login Api
    */
   registerUser= [

        // check('USERID', 'USERID parameter is missing.')
        //     .exists()
        //     .isInt()
        //     .not().isEmpty()
        //     .withMessage("USERID can't blank."),
        
        check('USEREMAILID', 'USEREMAILID parameter is missing.')
            .exists()
            .isString()
            .not().isEmpty()
            .withMessage("USEREMAILID can't blank."),
        
        check('USERPASSWORD', 'USERPASSWORD parameter is missing.')
            .exists()
            .isString()
            .not().isEmpty()
            .withMessage("USERPASSWORD type can't blank."),

            check('USERROLEID', 'USERROLEID parameter is missing.')
            .exists()
            .isInt()
            .not().isEmpty()
            .withMessage("USERPASSWORD type can't blank."),
        
        
        this.validateRequest
    ];


    login= [

       check('USEREMAILID', 'USEREMAILID parameter is missing.')
            .exists()
            .isString()
            .not().isEmpty()
            .withMessage("USEREMAILID can't blank."),
        
        check('USERPASSWORD', 'USERPASSWORD parameter is missing.')
            .exists()
            .isString()
            .not().isEmpty()
            .withMessage("USERPASSWORD type can't blank."),

           this.validateRequest
    ];
    validateRequest(req: Request, res: Response, next: NextFunction) {
        var errors = validationResult(req);            
        if ( !errors.isEmpty() ) {
            return res.status(422).json({ errors: errors.array() });;
        }
        next();
    }
}