import emailRouter from "./email.js"
import issuerRouter from "./issuer.js"
const emailRoute = emailRouter()
const issuerRoute = issuerRouter()
export default{
    emailRoute,
    issuerRoute
}
