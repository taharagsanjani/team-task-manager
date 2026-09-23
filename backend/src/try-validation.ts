import { validateProject } from "./validators/project.js";

const project = {
  name: 123456789,
};
const test = validateProject(project);

if (test.success === false && test.error === "نام پروژه باید متن باشد.") {
  console.log("pass: نام پروژه باید متن باشد.");
  console.log(project.name, "غلطع");
} else {
  throw new Error("FAIL: انتظار داشتیم نامِ فقط عدد رد شود");
}
