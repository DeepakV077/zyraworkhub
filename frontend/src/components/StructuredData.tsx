import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSEOProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSEO({ items }: BreadcrumbSEOProps) {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
    </Helmet>
  );
}

interface WebinarSEOProps {
  title: string;
  description: string;
  date: string;
  instructor: string;
  duration: string;
  url: string;
}

export function WebinarSEO({ title, description, date, instructor, duration, url }: WebinarSEOProps) {
  const webinarStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": title,
    "description": description,
    "startDate": date,
    "endDate": date,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": url
    },
    "organizer": {
      "@type": "Organization",
      "name": "Zyra Academy",
      "url": "https://zyraacademy.com"
    },
    "performer": {
      "@type": "Person",
      "name": instructor
    },
    "duration": duration,
    "isAccessibleForFree": true
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webinarStructuredData)}
      </script>
    </Helmet>
  );
}

interface ArticleSEOProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
}

export function ArticleSEO({ title, description, author, publishedDate, modifiedDate, image, url }: ArticleSEOProps) {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zyra Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zyraacademy.com/logo.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
    </Helmet>
  );
}

interface OrganizationSEOProps {
  name?: string;
  description?: string;
}

export function OrganizationSEO({ 
  name = "Zyra Academy",
  description = "Empowering youth through expert-led webinars, professional design services, and marketing support."
}: OrganizationSEOProps) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "description": description,
    "url": "https://zyraacademy.com",
    "logo": "https://zyraacademy.com/logo.png",
    "image": "https://zyraacademy.com/og-image.png",
    "sameAs": [
      "https://linkedin.com/company/zyraacademy",
      "https://instagram.com/zyraacademy",
      "https://twitter.com/zyraacademy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "zyra.teams.in@gmail.com",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
    </Helmet>
  );
}
