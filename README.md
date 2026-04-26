<div align="center">
  <img src="public/assets/logo.png" alt="CrazeCheck Logo" width="120" />
  <h1>🚀 CrazeCheck: The Ultimate Startup Idea Validator</h1>
  <p><strong>Validate your vision. Unlock investor-grade insights. Build with confidence.</strong></p>

  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 🌟 Why CrazeCheck?
CrazeCheck transforms raw startup ideas into comprehensive, actionable analytical reports. Designed for founders, by founders, it leverages advanced AI to save you months of research and thousands of dollars in "wrong turns."

## ✨ Killer Features

### 📊 Professional 10-Tab Analysis
Every idea undergoes a massive deep-dive across 10 strategic categories:
- **Executive Overview**: High-level viability scoring.
- **Market Dynamics**: TAM, SAM, and SOM calculations.
- **Competitive Landscape**: Direct/Indirect threat analysis.
- **90-Day Roadmap**: Battle-tested execution steps.
- **Revenue Engines**: Diversified monetization strategies.
- *And much more...*

### 🔒 Premium Monetization & Viral Loop
- **Pro Tier Upgrade**: Unlock unlimited validations and deep-tier insights for just **$9**.
- **Viral Unlock**: Share your results on X (Twitter) to temporarily unlock premium analytics for free.

### 🏠 Founder Dashboard
Keep a history of all your brainstormed ideas. Instantly re-open full reports and track your viability scores across different projects.

## 🛠️ Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS & Framer Motion for high-end animations
- **Backend/Auth**: Supabase (PostgreSQL, Edge Functions)
- **UI Components**: Radix UI + Lucide React
- **Payments**: Stripe Integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase account & project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/2003mahi/idea-validator.git
   cd idea-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Copy `.env.example` to `.env` and fill in the values from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api):
   ```env
   VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
   ```
   > **Note:** `VITE_SUPABASE_PUBLISHABLE_KEY` is accepted as an alias for `VITE_SUPABASE_ANON_KEY` for backwards-compatibility.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/2003mahi/idea-validator/issues).

## 🔧 Troubleshooting

### "Authentication Issue – Failed to fetch" on sign-up / sign-in

This error means the app could not reach the Supabase API. Common causes:

| Cause | Fix |
|---|---|
| Missing env vars locally | Copy `.env.example` → `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` |
| Missing env vars on Vercel | Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Project → Settings → Environment Variables** |
| Supabase project paused | Free-tier projects pause after 7 days of inactivity — resume it in the [Supabase dashboard](https://supabase.com/dashboard) |
| Network / CORS | Ensure your Supabase project's **Auth → URL Configuration → Site URL** includes your deployment URL |

### Vercel deployment checklist
1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel environment variables.
2. Trigger a **Redeploy** after adding the variables so Vite bakes them into the bundle.
3. Add your Vercel domain to **Supabase → Auth → URL Configuration → Redirect URLs**.



## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by NexusHub TEAM for Founders</p>
  <a href="https://github.com/2003mahi/idea-validator">
    <img src="https://img.shields.io/github/stars/2003mahi/idea-validator?style=social" alt="Stars" />
  </a>
</div>
