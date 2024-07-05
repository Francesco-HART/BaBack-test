import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../api/routes";

describe("Health check", () => {
  it.skip("should return 200", async () => {
    request(app)
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
