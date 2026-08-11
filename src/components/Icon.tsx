import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size }: IconProps) {
  // Safe dynamic lookup for Lucide icons
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) {
    // Fallback if icon isn't found
    return <Icons.HelpCircle className={className} size={size} />;
  }
  return <LucideIcon className={className} size={size} />;
}
