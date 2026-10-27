CREATE DATABASE IF NOT EXISTS new_model_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE new_model_school;
CREATE TABLE IF NOT EXISTS enquiries (
 id INT AUTO_INCREMENT PRIMARY KEY,
 parent_name VARCHAR(120) NOT NULL,
 phone VARCHAR(30) NOT NULL,
 email VARCHAR(160),
 child_name VARCHAR(120),
 class_interested VARCHAR(80),
 message TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS visit_bookings (
 id INT AUTO_INCREMENT PRIMARY KEY,
 parent_name VARCHAR(120) NOT NULL,
 phone VARCHAR(30) NOT NULL,
 preferred_date DATE,
 preferred_time VARCHAR(40),
 message TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS job_applications (
 id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(120) NOT NULL,
 phone VARCHAR(30) NOT NULL,
 email VARCHAR(160),
 qualification VARCHAR(180),
 experience VARCHAR(120),
 position VARCHAR(120),
 resume_path VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS events (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 event_date DATE NULL,
 description TEXT,
 image_path VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO events (title, event_date, description, image_path)
SELECT 'Annual Day 2027', '2027-01-10', 'A celebration of learning, confidence, creativity, and student performances.', '/assets/gallery-1.jpg'
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Annual Day 2027');

CREATE TABLE IF NOT EXISTS gallery_images (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 category VARCHAR(80) NOT NULL DEFAULT 'School Events',
 image_path VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS site_content (
 content_key VARCHAR(100) PRIMARY KEY,
 content_value TEXT NOT NULL,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO site_content(content_key,content_value) VALUES
('hero_title','Small steps today. Brighter futures tomorrow.'),
('hero_description','Purposeful learning, strong fundamentals, and caring guidance — helping every child build confidence from the very beginning.'),
('branch_location','Location to be announced'),
('announcement','A new branch is planned for the 2027–2028 academic year, offering Playgroup to Standard 5.'),
('footer_credit','Website developed by Prevolant');
INSERT IGNORE INTO gallery_images(title,category,image_path) VALUES
('Annual Day performances','Events','/assets/school-event-1.jpg'),
('Student stage performance','Events','/assets/school-event-2.jpg'),
('School celebration','Events','/assets/school-event-3.jpg'),
('Student performance','Events','/assets/school-event-4.jpg'),
('Annual Day group photo','Events','/assets/school-event-5.jpg'),
('School activity','Activities','/assets/school-event-6.jpg');
