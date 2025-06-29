# Tạp Chí Bitcoin - Crypto News Website

Trang web tin tức tiền điện tử SEO-friendly được xây dựng bằng Next.js 14 với App Router, TypeScript, Tailwind CSS và MongoDB.

## ✨ Tính năng

- 🚀 **Next.js 14** với App Router
- 📱 **Responsive Design** với Tailwind CSS
- 🔍 **SEO Optimization** với metadata, sitemap.xml, robots.txt
- 📊 **Database** MongoDB với Mongoose
- 🎨 **Modern UI** với Lucide Icons
- 📝 **Rich Content** với HTML parsing
- 🏷️ **Category & Tags** system
- 👥 **User Management** với role-based access
- 🔐 **Authentication** ready
- 📈 **Performance** optimized

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB với Mongoose
- **Authentication**: NextAuth.js (optional)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form với Zod

## 🚀 Cài đặt

### 1. Clone repository

\`\`\`bash
git clone <repository-url>
cd baotiendientu-frontend
\`\`\`

### 2. Cài đặt dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Cấu hình environment variables

Tạo file \`.env.local\` trong thư mục root:

\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/baotiendientu

# Site configuration
SITE_URL=http://localhost:3000
SITE_NAME="Tạp Chí Bitcoin"
SITE_DESCRIPTION="Tin tức và phân tích về tiền điện tử, blockchain và công nghệ tài chính"

# NextAuth (optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# JWT (optional)
JWT_SECRET=your-jwt-secret-here
\`\`\`

### 4. Khởi động MongoDB

Đảm bảo MongoDB đang chạy trên máy local:

\`\`\`bash
# macOS với Homebrew
brew services start mongodb-community

# Windows
mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

### 5. Chạy ứng dụng

\`\`\`bash
npm run dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu trúc thư mục

\`\`\`
baotiendientu-frontend/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── api/            # API routes
│   │   ├── article/        # Article pages
│   │   ├── category/       # Category pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── lib/                # Utilities
│   │   └── mongodb.ts      # Database connection
│   └── models/             # Database models
│       ├── Article.ts
│       ├── Category.ts
│       └── User.ts
├── public/                 # Static assets
├── scripts/                # Utility scripts
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
\`\`\`

## 🎯 API Endpoints

### Articles
- \`GET /api/articles\` - Lấy danh sách bài viết
- \`POST /api/articles\` - Tạo bài viết mới
- \`GET /api/articles/[slug]\` - Lấy chi tiết bài viết

### SEO
- \`GET /api/sitemap\` - Sitemap XML
- \`GET /api/robots\` - Robots.txt

## 📊 Database Models

### Article
- title, slug, excerpt, content
- featuredImage, publishedAt
- author, category, tags
- views, likes
- SEO metadata (metaTitle, metaDescription, metaKeywords)

### Category
- name, slug, description
- color, isActive

### User
- name, email, password
- role (admin, editor, author)
- avatar, bio, isActive

## 🔧 Tùy chỉnh

### Thay đổi theme colors
Chỉnh sửa file \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        // Add more colors
      }
    }
  }
}
\`\`\`

### Thêm categories mới
Tạo categories mới trong database:

\`\`\`js
{
  name: 'Blockchain',
  slug: 'blockchain',
  description: 'Tin tức về công nghệ blockchain',
  color: '#10B981'
}
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình environment variables
4. Deploy

### Other Platforms

Ứng dụng có thể deploy trên:
- Netlify
- Railway
- Heroku
- AWS
- Google Cloud

## 📈 SEO Features

- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Sitemap.xml auto-generated
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Image optimization
- ✅ Fast loading

## 🔒 Security

- Input validation với Zod
- Password hashing với bcryptjs
- JWT authentication
- CORS protection
- Rate limiting (có thể thêm)

## 🎨 UI Components

- Responsive header với navigation
- Article cards với metadata
- Category tags với custom colors
- Breadcrumb navigation
- Footer với links
- Search functionality (có thể mở rộng)

## 📝 Tính năng có thể mở rộng

- [ ] User authentication & authorization
- [ ] Admin dashboard
- [ ] Comment system
- [ ] Newsletter subscription
- [ ] Search functionality
- [ ] Related articles
- [ ] Social sharing
- [ ] RSS feed
- [ ] Multi-language support
- [ ] PWA features

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 📞 Support

Nếu có vấn đề gì, vui lòng tạo issue trên GitHub hoặc liên hệ qua email.

---

**Made with ❤️ using Next.js 14**
