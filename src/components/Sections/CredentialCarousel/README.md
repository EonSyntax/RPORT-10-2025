# CredentialCarousel Component

A beautiful, reusable React component for displaying credentials and certificates in an interactive carousel format.

## Features

✨ **Interactive Carousel** - Embla-powered carousel with smooth animations
🎨 **Tailwind Styled** - Modern design with hover effects and gradients
📱 **Responsive** - Works seamlessly on mobile, tablet, and desktop
♿ **Accessible** - Proper ARIA labels and keyboard navigation support
🔧 **Highly Customizable** - Easy to customize with your own certificates data
📋 **TypeScript Ready** - Works great with TypeScript projects

## Installation

### Option 1: Copy Files Directly

Copy the entire `CredentialCarousel` folder to your project's components directory:

```
src/components/
  └── CredentialCarousel/
      ├── CredentialCarousel.jsx
      ├── CertificateCard.jsx
      └── index.js
```

### Option 2: Required Dependencies

Make sure your project has these dependencies installed:

```bash
npm install embla-carousel-react lucide-react tailwindcss
```

## Usage

### Basic Example

```jsx
import { CredentialCarousel } from "@/components/CredentialCarousel";

const MyComponent = () => {
  const certificates = [
    {
      id: "1",
      issuingOrganization: "AWS",
      credentialName: "AWS Solutions Architect Associate",
      credentialId: "AWS-SAA-2024-789456",
      credentialUrl: "https://aws.amazon.com/verification",
      issueDate: "2024-01-15",
      expiryDate: "2027-01-15",
      certificateImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      organizationLogo:
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    // ... more certificates
  ];

  return (
    <CredentialCarousel
      certificates={certificates}
      title="My Professional Certifications"
      subtitle="Verified credentials and professional achievements"
    />
  );
};
```

### With Custom Styling

The component uses Tailwind CSS classes with CSS variables for theming. You can customize colors by modifying your Tailwind configuration:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        // ... other colors
      },
    },
  },
};
```

## Props

### CredentialCarousel

| Prop           | Type   | Default                                                                  | Description                             |
| -------------- | ------ | ------------------------------------------------------------------------ | --------------------------------------- |
| `certificates` | Array  | `[]`                                                                     | Array of certificate objects to display |
| `title`        | string | `"Professional Certifications"`                                          | Section heading                         |
| `subtitle`     | string | `"Verified credentials demonstrating expertise and continuous learning"` | Section subheading                      |

### Certificate Object Structure

Each certificate in the array should have:

```typescript
interface Certificate {
  id: string; // Unique identifier
  issuingOrganization: string; // Organization name (e.g., "AWS", "Google Cloud")
  credentialName: string; // Full credential/cert name
  credentialId: string; // Credential reference number
  credentialUrl: string; // URL to verify credential
  issueDate: string; // ISO date format (YYYY-MM-DD)
  expiryDate?: string; // ISO date format, optional
  certificateImage: string; // Image URL for card display
  organizationLogo: string; // Logo URL (currently not displayed but available)
}
```

## Styling & Customization

### CSS Classes Used

The component relies on these Tailwind classes:

- Background and text colors via CSS variables
- Gradient classes: `gradient-gold`, `shadow-gold`, `shadow-soft`, `shadow-elevated`
- Animation classes: `transition-all`, `transition-transform`, `transition-colors`

### Custom Gradient Example

Add to your CSS or Tailwind configuration:

```css
.gradient-gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.shadow-gold {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.shadow-soft {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.shadow-elevated {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Theme Integration

### With Next.js / Dark Mode

The component respects your theme context. If using `next-themes`:

```jsx
import { ThemeProvider } from "next-themes";

export default function App() {
  return (
    <ThemeProvider attribute="class">
      <CredentialCarousel certificates={certs} />
    </ThemeProvider>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading images is recommended for optimal performance
- The carousel uses Embla Carousel which is lightweight (~5KB gzipped)
- Consider virtualization if displaying 100+ certificates

## Accessibility

- ✅ ARIA labels on navigation buttons
- ✅ Keyboard navigation support
- ✅ Proper color contrast ratios
- ✅ Semantic HTML structure

## Examples

### Integration with a Portfolio

```jsx
import { CredentialCarousel } from "@/components/CredentialCarousel";

export default function Portfolio() {
  const myCredentials = [
    // ... your certificate data
  ];

  return (
    <div>
      <header>My Portfolio</header>
      <CredentialCarousel
        certificates={myCredentials}
        title="Certifications & Credentials"
      />
      <footer>Contact me</footer>
    </div>
  );
}
```

### Dynamic Certificate Loading

```jsx
import { useState, useEffect } from "react";
import { CredentialCarousel } from "@/components/CredentialCarousel";

export default function DynamicCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from API
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return <CredentialCarousel certificates={certificates} />;
}
```

## Troubleshooting

### Images not loading?

- Ensure image URLs are publicly accessible
- Check CORS headers if using external images
- Use placeholder images during development

### Carousel not sliding?

- Verify `embla-carousel-react` is installed
- Check that certificates array has at least 1 item
- Inspect browser console for errors

### Styling issues?

- Ensure Tailwind CSS is properly configured
- Check that required CSS variables are defined
- Verify custom gradient classes are included in your CSS

## License

This component is free to use and modify for your projects.

## Contributing

Found a bug or have a suggestion? Feel free to modify and improve!

---

**Built with React + Tailwind CSS + Embla Carousel**
