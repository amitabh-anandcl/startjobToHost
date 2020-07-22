import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from "express-validator";

export class CandidateDetailsValidator {

    constructor() {

    }
    // /**
    //  * Validator to check Input Parmaeter for candidateDetails Api
    // */
    addUpdateCandidateDetails= [

        check('CANDIDATENAME', 'CANDIDATENAME parameter is missing.')
            .exists()
            .isString()
            .withMessage('CANDIDATENAME should be string.')
            .not().isEmpty()
            .withMessage("CANDIDATENAME can't be blank ."),
        
        check('CANDIDATEEMAILID', 'CANDIDATEEMAILID parameter is missing.')
            .exists()
            .isString()
            .withMessage('CANDIDATEEMAILID should string.')
            .not().isEmpty()
            .withMessage("CANDIDATEEMAILID can't be blank ."),
        
        check('CANDIDATEPHONENO', 'CANDIDATEPHONENO is missing.')
            .exists()
            .isString()
            .withMessage('CANDIDATEPHONENO should string.')
            .not().isEmpty()
            .withMessage("CANDIDATEPHONENO can't be blank ."),

        check('CANDIDATEADDRESS', 'CANDIDATEADDRESS parameter is missing.')
            .exists()
            .isString()
            .withMessage('CANDIDATEADDRESS should string.')
            .not().isEmpty()
            .withMessage("CANDIDATEADDRESS can't be blank ."),
            
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