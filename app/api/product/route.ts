import router from "next/router";

export default function GET(req: Request, res: Response) {
    router.push("/product");
}