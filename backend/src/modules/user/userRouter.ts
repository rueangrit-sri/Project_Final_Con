import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { userService } from "@modules/user/userService";
import { CreateUserSchema, UpdateUserSchema, DeleteUserSchema } from "@modules/user/userModel";

export const userRouter = (() => {
    const router = express.Router();

    // GET all users
    router.get("/get", async (req: Request, res: Response) => {
        const serviceResponse = await userService.findAll();
        handleServiceResponse(serviceResponse, res);
    });

    // CREATE a user
    router.post("/create", validateRequest(CreateUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await userService.create(payload);
        handleServiceResponse(serviceResponse, res);
    });

    // UPDATE a user
    router.put("/update", validateRequest(UpdateUserSchema), async (req: Request, res: Response) => {
        const { user_id } = req.body; // user_id ควรอยู่ใน body
        const payload = req.body;
        const serviceResponse = await userService.update(user_id, payload);
        handleServiceResponse(serviceResponse, res);
    });

    // DELETE a user using body
    router.delete("/delete/:user_id", validateRequest(DeleteUserSchema), async (req: Request, res: Response) => {
        const { user_id } = req.params; // รับ user_id จาก body
        const serviceResponse = await userService.delete(user_id);
        handleServiceResponse(serviceResponse, res);
    });

    // router.post("/login", validateRequest(DeleteUserSchema), async (req: Request, res: Response) => {
    //     const { user_id } = req.params; // รับ user_id จาก body
    //     const serviceResponse = await userService.delete(user_id);
    //     handleServiceResponse(serviceResponse, res);
    // });
    
        
    return router;

    
})();

// กำหนดเส้น Api 



