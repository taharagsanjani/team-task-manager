type taskInput = {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
};

type ValidationResult =
  | { success: true; data: taskInput }
  | { success: false; error: string };

export function validateTask(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      error: "اطلاعات تسک باید یک آبجکت باشد.",
    };
  }
  if (!("title" in input) || typeof input.title !== "string") {
    return {
      success: false,
      error: "نام تسک باید متن باشد.",
    };
  }

  const title = input.title.trim();

  if (title.length === 0) {
    return {
      success: false,
      error: "نام تسک الزامی است.",
    };
  }

  let description = "";
  if ("description" in input) {
    if (typeof input.description !== "string") {
      return {
        success: false,
        error: "توضیحات تسک باید متن باشد.",
      };
    }

    description = input.description.trim();
  }

  let status: taskInput["status"] = "todo";

  if ("status" in input) {
    if (
      input.status !== "todo" &&
      input.status !== "in_progress" &&
      input.status !== "done"
    )
      return {
        success: false,
        error: "نوع وضعیت تسک باید یکی از سه تا باشد.",
      };
    status = input.status;
  }
  return {
    success: true,
    data: { title, description, status },
  };
}

type ValidationTaskResult =
  | { success: true; data: { status: "todo" | "in_progress" | "done" } }
  | { success: false; error: string };

export function validateTaskStatus(input: unknown): ValidationTaskResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { success: false, error: "ورودی باید آبجکت باشد." };
  }
  if (!("status" in input)) {
    return { success: false, error: "وضعیت تسک الزامی است." };
  }
  if (
    input.status !== "todo" &&
    input.status !== "in_progress" &&
    input.status !== "done"
  ) {
    return { success: false, error: "نام وضعیت نامعتبر است." };
  }
  return {
    success: true,
    data: { status: input.status },
  };
}
