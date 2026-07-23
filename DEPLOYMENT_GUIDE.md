# Deployment Guide for festybam Motors

## 🚀 Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend

```bash
cd client
npm run build
```

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**: Visit [vercel.com](https://vercel.com)
2. **Import Your Project**: 
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-api.render.com
   VITE_PAYSTACK_PUBLIC_KEY=your_key
   VITE_CLOUDINARY_CLOUD_NAME=your_name
   VITE_GOOGLE_MAPS_API_KEY=your_key
   ```

5. **Deploy**: Click "Deploy"

Your frontend will be live at `https://your-project.vercel.app`

---

## 🚀 Backend Deployment on Render

### Step 1: Prepare Your Backend

```bash
cd server
npm install
```

### Step 2: Deploy to Render

1. **Sign up/Login to Render**: Visit [render.com](https://render.com)
2. **Create New Web Service**:
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**:
   - **Name**: `festybam-motors-api`
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   PAYSTACK_SECRET_KEY=your_key
   PAYSTACK_PUBLIC_KEY=your_key
   FRONTEND_URL=https://your-project.vercel.app
   ```

5. **Deploy**: Click "Create Web Service"

Your backend will be live at `https://your-backend-api.render.com`

---

## 🗄️ Database Setup on MongoDB Atlas

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Create an account

### Step 2: Create a Cluster

1. Click "Create a Cluster"
2. Choose **M0 Free** tier
3. Select your region (closest to your users)
4. Click "Create Cluster"

### Step 3: Set Up Database

1. Go to "Databases"
2. Click "Browse Collections"
3. Create a new database: `festybam_motors`

### Step 4: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `festybam_admin`
4. Password: Generate secure password
5. Set permissions to "Atlas admin"
6. Click "Add User"

### Step 5: Get Connection String

1. Go to "Clusters"
2. Click "Connect"
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>`

Add this to your backend `.env`:
```
MONGODB_URI=mongodb+srv://festybam_admin:password@cluster.mongodb.net/festybam_motors?retryWrites=true&w=majority
```

### Step 6: Whitelist IPs

1. Go to "Network Access"
2. Click "Add IP Address"
3. Add `0.0.0.0/0` for development (allow all)
4. For production, add specific IPs

---

## 📧 Email Configuration (Nodemailer + Gmail)

### Step 1: Enable Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" on the left
3. Enable "2-Step Verification"
4. Go to "App passwords"
5. Select "Mail" and "Windows Computer"
6. Copy the generated password

### Step 2: Configure Email in `.env`

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=generated_app_password
EMAIL_FROM=noreply@festybam.com
```

---

## 💳 Paystack Integration

### Step 1: Create Paystack Account

1. Go to [paystack.com](https://paystack.com)
2. Sign up with your email
3. Verify your email and business details

### Step 2: Get API Keys

1. Go to "Settings" → "API Keys & Webhooks"
2. Copy your **Secret Key** and **Public Key**

### Step 3: Configure Keys

**Backend `.env`**:
```
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

**Frontend `.env`**:
```
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

### Step 4: Setup Webhook

1. In Paystack, go to "Settings" → "API Keys & Webhooks"
2. Add Webhook URL: `https://your-backend-api.render.com/api/payments/webhook`
3. Select events: `charge.success`, `charge.failed`

---

## 🖼️ Cloudinary Configuration

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free
3. Verify your email

### Step 2: Get API Keys

1. Go to "Settings" → "API Keys"
2. Copy your **Cloud Name**, **API Key**, and **API Secret**

### Step 3: Configure Keys

**Backend `.env`**:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend `.env`**:
```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 🧪 Testing Deployments

### Test Backend
```bash
curl https://your-backend-api.render.com/api/health
```

### Test Frontend
Visit `https://your-project.vercel.app` in your browser

### Test Database Connection
In MongoDB Atlas, check "Metrics" for connection activity

### Test Email
Create a new account on your deployed site - confirmation email should arrive

### Test Payments
Use Paystack test cards:
- Card: 4111111111111111
- Expiry: Any future date
- CVV: Any 3 digits

---

## 🔒 Security Checklist

- [ ] All environment variables are set on Vercel and Render (not in code)
- [ ] MongoDB has a strong password
- [ ] JWT secret is secure and random
- [ ] API keys are stored safely
- [ ] CORS is configured for your frontend domain only
- [ ] HTTPS is enabled (automatic on Vercel and Render)
- [ ] Rate limiting is enabled on backend
- [ ] Input validation is in place
- [ ] Sensitive data is not logged

---

## 📊 Monitoring & Logs

### Vercel Logs
1. Go to your project on Vercel
2. Click "Deployments"
3. Click on a deployment
4. View "Logs"

### Render Logs
1. Go to your service on Render
2. Click "Logs" tab
3. View real-time logs

### MongoDB Logs
1. Go to MongoDB Atlas
2. Click "Activity Feed"
3. Monitor database activity

---

## 🚨 Troubleshooting

### Backend won't start
- Check environment variables are set
- Check MongoDB connection string
- Check port 5000 is available
- Check server logs on Render

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Check backend is running
- Check CORS is enabled
- Check network tab in browser DevTools

### Database connection failing
- Check connection string is correct
- Check IP is whitelisted in MongoDB Atlas
- Check database user exists
- Check password is correct

### Email not sending
- Check Gmail app password
- Check 2-Step Verification is enabled
- Check less secure apps are allowed
- Check email configuration in backend

---

## 📞 Support

For deployment issues:
1. Check the official documentation
2. Review error logs carefully
3. Contact support channels:
   - Vercel: [vercel.com/support](https://vercel.com/support)
   - Render: [render.com/docs](https://render.com/docs)
   - MongoDB: [mongodb.com/community](https://www.mongodb.com/community)

---

**Happy Deploying! 🚀**
