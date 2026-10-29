type userInput = {
  username: string;
  email: string;
  password: string;
};

type ValidationResult =
  | { success: true; data: userInput }
  | { success: false; error: string };

export function validateUser(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      error: "اطلاعات یوزر باید یک آبجکت باشد.",
    };
  }
  if (!("username" in input) || typeof input.username !== "string") {
    return {
      success: false,
      error: "نام کاربری باید متن باشد.",
    };
  }
  const username = input.username.trim();

  if (username.length === 0) {
    return {
      success: false,
      error: "نام کاربری نباید خالی باشد.",
    };
  }

  let email = "";

  if ("email" in input) {
    if (typeof input.email !== "string") {
      return {
        success: false,
        error: "ایمیل باید متن باشد.",
      };
    }
    email = input.email.trim();
  }
  if (email.length === 0) {
    return {
      success: false,
      error: "ایمیل الزامی است.",
    };
  }

  let password = "";

  if ("password" in input) {
    if (typeof input.password !== "string") {
      return {
        success: false,
        error: "رمز باید متن باشد.",
      };
    }
    password = input.password;
  }
  if (password.length <= 7) {
    return {
      success: false,
      error: "رمز باید حداقل ۸ کاراکتر باشد.",
    };
  }

  return {
    success: true,
    data: { username, email, password },
  };
}
type loginInput = {
  email: string;
  password: string;
};

type ValidationLogin =
  | { success: true; data: loginInput }
  | { success: false; error: string };

export function validateLogin(input: unknown): ValidationLogin {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      error: "اطلاعات یوزر باید یک آبجکت باشد.",
    };
  }
  let email = "";

  if ("email" in input) {
    if (typeof input.email !== "string") {
      return {
        success: false,
        error: "ایمیل باید متن باشد.",
      };
    }
    email = input.email.trim();
  }
  if (email.length === 0) {
    return {
      success: false,
      error: "ایمیل الزامی است.",
    };
  }

  let password = "";

  if ("password" in input) {
    if (typeof input.password !== "string") {
      return {
        success: false,
        error: "رمز باید متن باشد.",
      };
    }
    password = input.password;
  }
  if (password.length === 0) {
    return {
      success: false,
      error: "رمز الزامی است.",
    };
  }

  return {
    success: true,
    data: { email, password },
  };
}
