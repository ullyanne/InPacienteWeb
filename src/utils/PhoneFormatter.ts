
export function formatPhone(phoneNumber: string | null): string {
  let formattedPhoneNumber = ''
  const phoneNumberRegex = /^(\d{2})(\d{5})(\d{4})$/;
  if (phoneNumber != null) {
    formattedPhoneNumber = phoneNumber.replace(phoneNumberRegex, "($1) $2-$3");
  }

  return formattedPhoneNumber
}