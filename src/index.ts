import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "<body><form action='/calculate' method='post'>Input Expression: <div><input type='text' name='input'></div></form></body>"
  );
});

var vars;
export const calculator = (req: any, res: any) => {
  vars = req.body.input.split(" ");
  // vars = [1, 2, "+"];
  // vars = [1,2,'-'];
  // vars = [1,2,'*'];
  // vars = [1,2,'/'];
  // vars = [1,2,3,'+','*'];
  // vars = [1,2,3,'*', '+'];
  // vars = [1,2,3,'+'];
  // vars = [1,2,'+','+'];

  let n: any[] = [];
  for (var i = 0; i < vars.length; i++) {
    if (vars[i] == "+") {
      n.push(n.pop() + n.pop());
    } else if (vars[i] == "-") {
      n.push(n.pop() - n.pop());
    } else if (vars[i] == "*") {
      n.push(n.pop() * n.pop());
    } else if (vars[i] == "/") {
      n.push(n.pop() * n.pop());
    } else {
      n.push(Number(vars[i]));
    }
  }

  var out = n.pop();

  res.send(
    `<body>
    <form action='/calculate'>Input Expression: <div><input type='text' name='input'></div></form>
    <div>Equation: ${req.body.input}</div>
    <div>Result: ${out}</div>
    </body>`
  );
};
app.post("/calculate", calculator);

export const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
