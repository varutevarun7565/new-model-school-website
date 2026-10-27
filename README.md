# New Model School Website — Prevolant

A responsive, English-only school website with scroll-reveal animations, a real-photo gallery, teacher vacancy applications, admission enquiries, school-visit requests, events management, and an admin dashboard. The footer credits **Website developed by Prevolant**.

## Requirements
- Node.js 18 or newer
- XAMPP with MySQL/MariaDB (or a MySQL server)

## Quick setup (Windows + XAMPP)
1. Extract the ZIP to a folder, then open that folder in VS Code.
2. Start **MySQL** in the XAMPP Control Panel. Apache is only needed if you want to use phpMyAdmin.
3. Copy the environment template:
   ```bat
   copy .env.example .env
   ```
4. Open `.env`. The default XAMPP settings are usually:
   ```ini
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=new_model_school
   ```
   If you have set a MySQL root password, enter it as `DB_PASSWORD`.
5. Install packages and start the server:
   ```bash
   npm install
   npm start
   ```
6. Open the public website at `http://localhost:3000` and admin at `http://localhost:3000/admin`.

**Automatic database setup:** when the server can connect to MySQL, it creates the `new_model_school` database and required tables automatically. You do not normally need to import SQL manually. The SQL file at `database/schema.sql` is also provided if you prefer to create the database manually using phpMyAdmin.

## Admin login
- Username: `admin`
- Password: `ChangeMe123!`

These are local-development defaults only. Change `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env` before sharing or deploying the site. Restart `npm start` after changing `.env`.

## If you see “Database is not connected”
1. Confirm MySQL shows as **Running** in XAMPP. If it does not start, check whether another MySQL service is using port 3306.
2. Check `.env` exists in the same folder as `server.js` (not inside `public`).
3. Check `DB_USER`, `DB_PASSWORD`, `DB_PORT`, and `DB_HOST` match your local MySQL setup.
4. Stop the Node server with `Ctrl+C`, then run `npm start` again.
5. Open `http://localhost:3000/api/health`. If `database` is `false`, the response includes a `databaseError` value. Common causes include `ECONNREFUSED` (MySQL is stopped/wrong port), `ER_ACCESS_DENIED_ERROR` (username/password mismatch), or a port conflict.
6. If you manually imported `database/schema.sql`, that is okay; the app uses `CREATE TABLE IF NOT EXISTS` and will preserve existing rows.

## Admin features
- Overview cards for enquiries, school visits, teacher applications, events, and gallery photos.
- Review parent enquiries, school visit requests, and teacher applications/resumes.
- Add and remove events.
- Upload and remove gallery photos, categorised as Events, Activities, Classroom, Learning Materials, individual programme-card photos, or Facilities. The School logo section lets an authenticated administrator replace the logo shown in the public website header (PNG/JPG/WEBP, max 8 MB). Supported formats: JPG, PNG, WEBP; 8 MB maximum. In Photo gallery, choose **Programmes - Playgroup / Nursery / Junior KG / Senior KG** to change that exact card photo in the homepage Our Programmes section. New uploads appear on the site after upload; delete old photos from the admin photo list when they are no longer needed.
- Edit homepage headline, homepage description, new-branch announcement/location status, and footer credit. The footer credit defaults to **Website developed by Prevolant**.
- Responsive dashboard with coloured cards, hover effects, and mobile navigation.

## Public website features
- Responsive school homepage and scrolling reveal animations.
- Principal and teacher profiles using the provided profile photos.
- Four USPs: own-designed books, strong fundamentals, affordable fees, and understanding before memorising.
- Premium “Our Programmes” cards with gradient heading, image zoom, hover lift, and responsive layout; each class card photo can be managed independently from the admin dashboard. Scroll-reveal blur-to-clear animations across sections. Gallery with category filters, including programme photos. Upload original high-resolution photos through the admin page as they become available.
- Admission enquiry, school visit, and teacher vacancy forms.
- Planned new branch announcement for Playgroup to Standard 5 in academic year 2027–2028; the location remains editable and unannounced.
- Contact links, Google Maps, WhatsApp, and Prevolant footer credit.

## Before public launch
- Verify staff names, qualifications, and images with the school.
- Obtain permission before publishing children’s photographs.
- Replace development credentials; configure HTTPS, backups, spam protection, and privacy notices.
- Email notifications are not configured in this local version; form submissions are stored in MySQL.
