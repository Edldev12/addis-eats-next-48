export function validateOrder(data) {
  const fieldErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  }

  if (!data.phone || !/^09\d{8}$/.test(data.phone.trim())) {
    fieldErrors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    fieldErrors.items = "Your cart is empty.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      items: data.items,
    },
  };
}