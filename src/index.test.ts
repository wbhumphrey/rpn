import { calculator, server } from ".";

describe("app", () => {
  afterAll(() => {
    server.close();
  });

  it("computes correctly", async () => {
    const req = {
      body: {
        input: "8 2 /",
      },
    };

    const res = await new Promise((resolve, reject) => {
      const res = {
        send: (resFRD: any) => {
          resolve(resFRD);
        },
      };

      calculator(req, res);
    });

    expect(res).toContain("Result: 4");
  });
});
