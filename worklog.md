---
Task ID: 1
Agent: main
Task: Fix 'Sun is not defined' error and replace plan system with credit system

Work Log:
- Fixed 'Sun is not defined' error by adding Sun to lucide-react imports in CatalogPage.tsx
- Updated Prisma schema: removed SubscriptionPlan model, added credits field to User, added CreditTransaction model
- Ran prisma db push to migrate database
- Updated seed.ts: replaced subscriptionPlan/subscriptionEnd with credits (admin: 999, demo: 10)
- Re-seeded database successfully
- Created /api/credits/route.ts (GET: balance+transactions, POST: deduct credits)
- Created /api/admin/credits/route.ts (GET: all users credits, POST: add credits to user)
- Updated app-store.ts: replaced subscriptionPlan/subscriptionEnd with credits in user type
- Updated /api/auth/me and login to return credits
- Updated /api/admin/users to return credits
- Rewrote PaymentsPage.tsx as credit balance page with transaction history
- Updated AppLayout.tsx: sidebar nav labels (Pagos→Créditos, Precios→Créditos), icons (CreditCard→Coins), credit badge
- Updated AdminPage.tsx: replaced Plan interface with CreditUser/CreditTransaction, replaced plan state/fetchers/actions with credit equivalents, replaced Precios tab UI with credit management table, add credits dialog, transaction history view
- Updated admin users table: subscription column → credits column
- Updated /api/admin route: totalRevenue → totalCredits aggregation
- Updated WizardPage.tsx: credit check before generating document, credit deduction on completion
- Disabled /api/plans endpoint (returns empty plans array)
- Added Coins import to DashboardPage.tsx
- Build verified successful

Stage Summary:
- Sun is not defined error: FIXED (added import)
- Plan system replaced with credit system: COMPLETE
- Each user gets X credits, admin can add more via Créditos tab
- 1 credit = 1 completed document by registered user
- Build passes successfully
