const piston = "piston-client";

const generateCode = async() => {
  const client = piston();
  const result = await client.execute(
    "javascript",
    'console.log("Hello world!")',
    { language: "3.9.4 " }
  );
  console.log(result.run.output);
};

generateCode()