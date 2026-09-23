type ProjectInput = {
  name: string;
  description: string;
};

type ValidationResult =
  | { success: true; data: ProjectInput }
  | { success: false; error: string };

export function validateProject(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      error: "اطلاعات پروژه باید یک آبجکت باشد.",
    };
  }
  if (!("name" in input) || typeof input.name !== "string") {
    return {
      success: false,
      error: "نام پروژه باید متن باشد.",
    };
  }

  const name = input.name.trim();

  if (name.length === 0) {
    return {
      success: false,
      error: "نام پروژه الزامی است.",
    };
  }

  let description = "";
  if ("description" in input) {
    if (typeof input.description !== "string") {
      return {
        success: false,
        error: "توضیحات پروژه باید متن باشد.",
      };
    }

    description = input.description.trim();
  }

  return {
    success: true,
    data: { name, description },
  };
}

