const passwordStrengthRequirements = [
  { regex: /[a-z]/ },
  { regex: /[A-Z]/ },
  { regex: /[0-9]/ },
  { regex: /[!@#$%^&*]/ },
];

interface PasswordStrengthProps {
  password: string;
}

function PasswordStrength({ password }: PasswordStrengthProps) {
  const validCount = passwordStrengthRequirements.filter((r) =>
    r.regex.test(password)
  ).length;

  return (
    <div className="mt-1 flex gap-1">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-lg transition-colors duration-300 ${
            index < validCount
              ? 'bg-[var(--primary-dark)]'
              : 'bg-[var(--primary-white)]'
          }`}
        />
      ))}
    </div>
  );
}

export default PasswordStrength;
