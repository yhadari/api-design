import { get, post } from "httpie";

try {
  const { data } = await get("http://localhost:3000");
  console.log(data);
} catch (err) {
  console.error("Error!", err.statusCode, err.message);
  console.error("~> headers:", err.headers);
  console.error("~> data:", err.data);
}
