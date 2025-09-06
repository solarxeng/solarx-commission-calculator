# Solar X Commission Calculator

This project is a lightweight web application that calculates commissions for Solar X sales reps. It is implemented using the Next.js App Router and TailwindCSS. The app includes motivational quotes, a micro‑coach to suggest ways to maximise commissions, the ability to save and search deals, and some simple gamification with confetti and cash stack animations.

## Features

* **Commission Calculator** – Enter the number of deals closed, price per watt (PPW), and system size to compute base payout, PPW bonus, system bonus and total payout.
* **Gamification** – Rain money animations and confetti when you hit big payouts.
* **Micro‑Coach** – Provides tips on how to boost your commissions based on your current inputs.
* **Saved Deals** – Save and recall deal configurations for quick comparison, with a simple search filter.
* **Themes** – Five selectable colour themes. Your choice persists in localStorage across sessions.
* **Password Protection** – Controlled via the `middleware.ts` file using HTTP Basic Authentication. Set `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` environment variables to lock down access (leave unset for public access).

## Running locally

To run this project on your machine:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Deploying

This app is ready to be deployed on platforms such as [Vercel](https://vercel.com/) that support Next.js. When deploying, remember to set the `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` environment variables in your hosting provider’s dashboard if you want to password‑protect the site.
