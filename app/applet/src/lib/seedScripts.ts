import { ChallengeDomain } from '../types';

export const SEED_SCRIPTS: Record<ChallengeDomain, string> = {
  business: `
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  address TEXT,
  email TEXT
);

CREATE TABLE products (
  product_id TEXT PRIMARY KEY,
  product_name TEXT,
  description TEXT,
  price INTEGER
);

CREATE TABLE orders (
  order_id TEXT PRIMARY KEY,
  user TEXT,
  product_ordered TEXT,
  total_paid INTEGER,
  FOREIGN KEY (user) REFERENCES users(user_id),
  FOREIGN KEY (product_ordered) REFERENCES products(product_id)
);

INSERT INTO users (user_id, first_name, last_name, address, email) VALUES 
('u1', 'John', 'Doe', '123 Main St', 'john@example.com'),
('u2', 'Jane', 'Smith', '456 Oak Ave', 'jane@example.com'),
('u3', 'Bob', 'Johnson', '789 Pine Rd', 'bob@example.com'),
('u4', 'Alice', 'Williams', '321 Elm St', 'alice@example.com'),
('u5', 'Charlie', 'Brown', '654 Maple Dr', 'charlie@example.com'),
('u6', 'Diana', 'Prince', '987 Cedar Ln', 'diana@example.com'),
('u7', 'Evan', 'Davis', '741 Birch Blvd', 'evan@example.com'),
('u8', 'Fiona', 'Garcia', '852 Spruce Ct', 'fiona@example.com'),
('u9', 'George', 'Miller', '963 Walnut Way', 'george@example.com'),
('u10', 'Hannah', 'Martinez', '159 Ash Pl', 'hannah@example.com');

INSERT INTO products (product_id, product_name, description, price) VALUES 
('p1', 'Laptop', 'High performance laptop', 1200),
('p2', 'Mouse', 'Wireless mouse', 25),
('p3', 'Keyboard', 'Mechanical keyboard', 75),
('p4', 'Monitor', '27-inch 4K display', 350),
('p5', 'Headphones', 'Noise-cancelling over-ear', 150),
('p6', 'Webcam', '1080p HD camera', 60),
('p7', 'Microphone', 'USB condenser mic', 85),
('p8', 'Desk', 'Adjustable standing desk', 400),
('p9', 'Chair', 'Ergonomic office chair', 250),
('p10', 'USB Hub', '7-port USB-C hub', 45);

INSERT INTO orders (order_id, user, product_ordered, total_paid) VALUES 
('o1', 'u1', 'p1', 1200),
('o2', 'u1', 'p2', 25),
('o3', 'u2', 'p3', 75),
('o4', 'u3', 'p1', 1150),
('o5', 'u4', 'p4', 350),
('o6', 'u4', 'p2', 20),
('o7', 'u5', 'p5', 150),
('o8', 'u6', 'p8', 400),
('o9', 'u6', 'p9', 250),
('o10', 'u7', 'p7', 85),
('o11', 'u8', 'p10', 45),
('o12', 'u9', 'p6', 60),
('o13', 'u1', 'p5', 140),
('o14', 'u2', 'p4', 350),
('o15', 'u10', 'p1', 1200),
('o16', 'u10', 'p2', 25),
('o17', 'u3', 'p3', 75),
('o18', 'u5', 'p7', 85);
  `,
  science: `
CREATE TABLE species (
  species_id TEXT PRIMARY KEY,
  common_name TEXT,
  scientific_name TEXT,
  conservation_status TEXT
);

CREATE TABLE zones (
  zone_id TEXT PRIMARY KEY,
  zone_name TEXT,
  habitat_type TEXT
);

CREATE TABLE researchers (
  researcher_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  specialty TEXT
);

CREATE TABLE sightings (
  sighting_id TEXT PRIMARY KEY,
  species_id TEXT,
  zone_id TEXT,
  researcher_id TEXT,
  health_status TEXT,
  temperature_celsius INTEGER,
  FOREIGN KEY (species_id) REFERENCES species(species_id),
  FOREIGN KEY (zone_id) REFERENCES zones(zone_id),
  FOREIGN KEY (researcher_id) REFERENCES researchers(researcher_id)
);

INSERT INTO species (species_id, common_name, scientific_name, conservation_status) VALUES
('s1', 'Grizzly Bear', 'Ursus arctos horribilis', 'Threatened'),
('s2', 'Gray Wolf', 'Canis lupus', 'Endangered'),
('s3', 'Bison', 'Bison bison', 'Near Threatened'),
('s5', 'Cutthroat Trout', 'Oncorhynchus clarkii', 'Least Concern'),
('s6', 'Wolverine', 'Gulo gulo', 'Vulnerable'),
('s7', 'Moose', 'Alces alces', 'Least Concern');

INSERT INTO zones (zone_id, zone_name, habitat_type) VALUES
('z1', 'Geyser Basin', 'Geothermal'),
('z2', 'Lamar Valley', 'Grassland'),
('z3', 'Yellowstone Lake', 'Aquatic'),
('z4', 'Mount Washburn', 'Alpine'),
('z5', 'Slough Creek', 'Riparian');

INSERT INTO researchers (researcher_id, first_name, last_name, specialty) VALUES
('r1', 'Alan', 'Grant', 'Large Mammals'),
('r2', 'Ellie', 'Sattler', 'Ecology'),
('r3', 'Ian', 'Malcolm', 'Population Dynamics'),
('r4', 'Sarah', 'Harding', 'Large Mammals'),
('r5', 'Gerry', 'Harding', 'Veterinary Sciences'),
('r6', 'John', 'Hammond', 'Business Administration');

INSERT INTO sightings (sighting_id, species_id, zone_id, researcher_id, health_status, temperature_celsius) VALUES
('st1', 's1', 'z1', 'r1', 'Vulnerable', 12),
('st2', 's2', 'z2', 'r2', 'Healthy', 8),
('st3', 's3', 'z2', 'r1', 'Healthy', 15),
('st4', 's1', 'z5', 'r4', 'Healthy', 14),
('st5', 's5', 'z3', 'r2', 'Healthy', 5),
('st6', 's2', 'z4', 'r3', 'Injured', 2),
('st7', 's3', 'z2', 'r4', 'Healthy', 10),
('st8', 's6', 'z4', 'r5', 'Vulnerable', -5),
('st9', 's3', 'z2', 'r1', 'Healthy', 16),
('st10', 's1', 'z2', 'r5', 'Healthy', 9),
('st11', 's2', 'z5', 'r3', 'Sick', 6),
('st12', 's5', 'z3', 'r2', 'Healthy', 4);
  `,
  education: `
CREATE TABLE departments (
  department_id TEXT PRIMARY KEY,
  department_name TEXT
);

CREATE TABLE professors (
  professor_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  department_id TEXT,
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE students (
  student_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  enrollment_year INTEGER,
  gpa REAL
);

CREATE TABLE courses (
  course_id TEXT PRIMARY KEY,
  course_name TEXT,
  department_id TEXT,
  credits INTEGER,
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE enrollments (
  enrollment_id TEXT PRIMARY KEY,
  student_id TEXT,
  course_id TEXT,
  grade TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO departments (department_id, department_name) VALUES
('d1', 'Computer Science'),
('d2', 'Mathematics'),
('d3', 'Physics'),
('d4', 'History');

INSERT INTO professors (professor_id, first_name, last_name, department_id) VALUES
('p1', 'Grace', 'Hopper', 'd1'),
('p2', 'Alan', 'Turing', 'd2'),
('p3', 'Albert', 'Einstein', 'd3'),
('p4', 'Marie', 'Curie', 'd3'),
('p5', 'Herodotus', 'Halicarnassus', 'd4');

INSERT INTO students (student_id, first_name, last_name, enrollment_year, gpa) VALUES
('st1', 'Alice', 'Smith', 2022, 3.8),
('st2', 'Bob', 'Jones', 2021, 3.2),
('st3', 'Charlie', 'Brown', 2023, 3.5),
('st4', 'Diana', 'Prince', 2020, 3.9),
('st5', 'Evan', 'Davis', 2022, 2.8),
('st6', 'Fiona', 'Gallagher', 2021, 3.1),
('st8', 'Harry', 'Potter', 2023, 3.4),
('st9', 'Isaac', 'Newton', 2020, 3.9),
('st10', 'Jack', 'Sparrow', 2021, 2.5),
('st11', 'Kevin', 'Malone', 2021, 2.1),
('st12', 'Luna', 'Lovegood', 2022, 3.6);

INSERT INTO courses (course_id, course_name, department_id, credits) VALUES
('c1', 'Introduction to Programming', 'd1', 3),
('c2', 'Calculus I', 'd2', 4),
('c3', 'Data Structures', 'd1', 4),
('c4', 'Quantum Mechanics', 'd3', 4),
('c5', 'World History', 'd4', 3),
('c6', 'Linear Algebra', 'd2', 3);

INSERT INTO enrollments (enrollment_id, student_id, course_id, grade) VALUES
('e1', 'st1', 'c1', 'A'),
('e2', 'st2', 'c2', 'B'),
('e3', 'st1', 'c3', 'A'),
('e4', 'st3', 'c1', 'B'),
('e5', 'st4', 'c4', 'A'),
('e6', 'st4', 'c5', 'A'),
('e7', 'st5', 'c2', 'C'),
('e8', 'st6', 'c5', 'B'),
('e9', 'st2', 'c6', 'B'),
('e10', 'st1', 'c2', 'A'),
('e11', 'st8', 'c1', 'B'),
('e12', 'st9', 'c2', 'A'),
('e13', 'st9', 'c4', 'A'),
('e14', 'st10', 'c5', 'C'),
('e15', 'st12', 'c3', 'B'),
('e16', 'st11', 'c1', 'C');
  `,
  healthcare: `
CREATE TABLE patients (
  patient_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  date_of_birth TEXT,
  gender TEXT
);

CREATE TABLE providers (
  provider_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  specialty TEXT
);

CREATE TABLE appointments (
  appointment_id TEXT PRIMARY KEY,
  patient_id TEXT,
  provider_id TEXT,
  appointment_date TEXT,
  status TEXT,
  cost REAL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (provider_id) REFERENCES providers(provider_id)
);

CREATE TABLE diagnoses (
  diagnosis_id TEXT PRIMARY KEY,
  appointment_id TEXT,
  icd_code TEXT,
  description TEXT,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

CREATE TABLE prescriptions (
  prescription_id TEXT PRIMARY KEY,
  appointment_id TEXT,
  medication_name TEXT,
  dosage TEXT,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
);

INSERT INTO patients (patient_id, first_name, last_name, date_of_birth, gender) VALUES
('pat1', 'John', 'Doe', '1980-05-15', 'M'),
('pat2', 'Jane', 'Smith', '1992-08-22', 'F'),
('pat3', 'Robert', 'Brown', '1975-11-03', 'M'),
('pat4', 'Emily', 'Davis', '1988-02-14', 'F'),
('pat5', 'Michael', 'Wilson', '2001-07-30', 'M'),
('pat6', 'Sarah', 'Moore', '1995-12-05', 'F'),
('pat7', 'David', 'Taylor', '1960-04-18', 'M'),
('pat8', 'Lisa', 'Anderson', '1982-09-25', 'F');

INSERT INTO providers (provider_id, first_name, last_name, specialty) VALUES
('prv1', 'Alice', 'Williams', 'Cardiology'),
('prv2', 'James', 'Miller', 'General Practice'),
('prv3', 'Susan', 'Martin', 'Pediatrics'),
('prv4', 'Richard', 'Thompson', 'Neurology'),
('prv5', 'Jessica', 'White', 'Dermatology');

INSERT INTO appointments (appointment_id, patient_id, provider_id, appointment_date, status, cost) VALUES
('apt1', 'pat1', 'prv1', '2023-10-15 09:00:00', 'Completed', 150.0),
('apt2', 'pat2', 'prv2', '2023-10-16 10:30:00', 'Completed', 100.0),
('apt3', 'pat3', 'prv2', '2023-10-16 11:00:00', 'No Show', 50.0),
('apt4', 'pat4', 'prv4', '2023-10-17 14:00:00', 'Completed', 200.0),
('apt5', 'pat1', 'prv2', '2023-11-05 09:30:00', 'Completed', 100.0),
('apt6', 'pat5', 'prv5', '2023-11-10 13:00:00', 'Canceled', 0.0),
('apt7', 'pat6', 'prv2', '2023-11-12 15:30:00', 'Completed', 120.0),
('apt8', 'pat7', 'prv1', '2023-11-20 10:00:00', 'Completed', 250.0),
('apt9', 'pat8', 'prv3', '2023-11-25 11:15:00', 'Completed', 80.0),
('apt10','pat2', 'prv5', '2023-12-01 14:45:00', 'Completed', 150.0);

INSERT INTO diagnoses (diagnosis_id, appointment_id, icd_code, description) VALUES
('dia1', 'apt1', 'I10', 'Essential (primary) hypertension'),
('dia2', 'apt2', 'J00', 'Acute nasopharyngitis [common cold]'),
('dia3', 'apt4', 'G43.909', 'Migraine, unspecified, not intractable, without status migrainosus'),
('dia4', 'apt5', 'E11.9', 'Type 2 diabetes mellitus without complications'),
('dia5', 'apt7', 'M54.5', 'Low back pain'),
('dia6', 'apt8', 'I25.10', 'Atherosclerotic heart disease of native coronary artery without angina pectoris'),
('dia7', 'apt10', 'L70.0', 'Acne vulgaris');

INSERT INTO prescriptions (prescription_id, appointment_id, medication_name, dosage) VALUES
('rx1', 'apt1', 'Lisinopril', '10mg daily'),
('rx2', 'apt4', 'Sumatriptan', '50mg as needed'),
('rx3', 'apt5', 'Metformin', '500mg twice daily'),
('rx4', 'apt7', 'Ibuprofen', '400mg every 6 hours'),
('rx5', 'apt8', 'Atorvastatin', '20mg daily'),
('rx6', 'apt10', 'Isotretinoin', '40mg daily');
  `,
  media: `
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  username TEXT,
  email TEXT,
  subscription_tier TEXT,
  join_date TEXT
);

CREATE TABLE artists (
  artist_id TEXT PRIMARY KEY,
  name TEXT,
  genre TEXT
);

CREATE TABLE tracks (
  track_id TEXT PRIMARY KEY,
  title TEXT,
  artist_id TEXT,
  duration_seconds INTEGER,
  release_year INTEGER,
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE playlists (
  playlist_id TEXT PRIMARY KEY,
  user_id TEXT,
  title TEXT,
  is_public BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE listening_history (
  listen_id TEXT PRIMARY KEY,
  user_id TEXT,
  track_id TEXT,
  listened_at TEXT,
  completed BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (track_id) REFERENCES tracks(track_id)
);

INSERT INTO users (user_id, username, email, subscription_tier, join_date) VALUES
('u1', 'musiclover99', 'music lover@example.com', 'Premium', '2023-01-15'),
('u2', 'dj_cool', 'dj@example.com', 'Free', '2023-03-22'),
('u3', 'classic_fan', 'classic@example.com', 'Premium', '2022-11-05'),
('u4', 'pop_star', 'pop@example.com', 'Free', '2023-05-10'),
('u5', 'rocker', 'rocker@example.com', 'Premium', '2021-08-30');

INSERT INTO artists (artist_id, name, genre) VALUES
('a1', 'The Groovers', 'Funk'),
('a2', 'Electronic Beats', 'EDM'),
('a3', 'Acoustic Soul', 'Folk'),
('a4', 'Symphony Orchestra', 'Classical'),
('a5', 'Pop Idols', 'Pop');

INSERT INTO tracks (track_id, title, artist_id, duration_seconds, release_year) VALUES
('t1', 'Funky Town', 'a1', 215, 2020),
('t2', 'Night Drive', 'a2', 180, 2022),
('t3', 'Morning Coffee', 'a3', 240, 2021),
('t4', 'Beethoven Symphony No. 5', 'a4', 450, 1808),
('t5', 'Summer Vibes', 'a5', 195, 2023),
('t6', 'Bass Drop', 'a2', 200, 2021),
('t7', 'Guitar Hero', 'a3', 255, 2019),
('t8', 'Dance All Night', 'a5', 210, 2022);

INSERT INTO playlists (playlist_id, user_id, title, is_public) VALUES
('p1', 'u1', 'Workout Mix', 1),
('p2', 'u2', 'Chill Vibes', 1),
('p3', 'u3', 'Classical Focus', 0),
('p4', 'u5', 'Road Trip', 1),
('p5', 'u4', 'Party Hits', 0);

INSERT INTO listening_history (listen_id, user_id, track_id, listened_at, completed) VALUES
('lh1', 'u1', 't1', '2023-10-01 08:00:00', 1),
('lh2', 'u1', 't2', '2023-10-01 08:04:00', 1),
('lh3', 'u2', 't5', '2023-10-02 14:30:00', 0),
('lh4', 'u3', 't4', '2023-10-02 20:00:00', 1),
('lh5', 'u4', 't8', '2023-10-03 22:15:00', 1),
('lh6', 'u5', 't1', '2023-10-04 17:45:00', 1),
('lh7', 'u1', 't6', '2023-10-05 09:20:00', 1),
('lh8', 'u2', 't3', '2023-10-05 11:10:00', 0),
('lh9', 'u5', 't7', '2023-10-06 18:30:00', 1),
('lh10', 'u3', 't4', '2023-10-07 19:40:00', 1);
  `,
  sports: `
CREATE TABLE venues (
  venue_id TEXT PRIMARY KEY,
  name TEXT,
  city TEXT,
  capacity INTEGER
);

CREATE TABLE teams (
  team_id TEXT PRIMARY KEY,
  name TEXT,
  city TEXT,
  founded_year INTEGER
);

CREATE TABLE players (
  player_id TEXT PRIMARY KEY,
  team_id TEXT,
  first_name TEXT,
  last_name TEXT,
  position TEXT,
  jersey_number INTEGER,
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE matches (
  match_id TEXT PRIMARY KEY,
  home_team_id TEXT,
  away_team_id TEXT,
  venue_id TEXT,
  match_date TEXT,
  home_score INTEGER,
  away_score INTEGER,
  FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
  FOREIGN KEY (away_team_id) REFERENCES teams(team_id),
  FOREIGN KEY (venue_id) REFERENCES venues(venue_id)
);

CREATE TABLE stats_log (
  stat_id TEXT PRIMARY KEY,
  match_id TEXT,
  player_id TEXT,
  goals INTEGER,
  assists INTEGER,
  minutes_played INTEGER,
  yellow_cards INTEGER,
  red_cards INTEGER,
  FOREIGN KEY (match_id) REFERENCES matches(match_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);

INSERT INTO venues (venue_id, name, city, capacity) VALUES
('v1', 'Grand Arena', 'Metro City', 50000),
('v2', 'Riverside Stadium', 'River Town', 35000),
('v3', 'Mountain Peak Field', 'Highlands', 20000);

INSERT INTO teams (team_id, name, city, founded_year) VALUES
('tm1', 'Metro City United', 'Metro City', 1980),
('tm2', 'River Town Rovers', 'River Town', 1995),
('tm3', 'Highlands FC', 'Highlands', 2002),
('tm4', 'Capital City Club', 'Capital City', 1975);

INSERT INTO players (player_id, team_id, first_name, last_name, position, jersey_number) VALUES
('pl1', 'tm1', 'John', 'Striker', 'Forward', 9),
('pl2', 'tm1', 'Mike', 'Defender', 'Defender', 4),
('pl3', 'tm2', 'David', 'Swift', 'Midfielder', 10),
('pl4', 'tm2', 'Chris', 'Wall', 'Goalkeeper', 1),
('pl5', 'tm3', 'Alex', 'Peak', 'Forward', 11),
('pl6', 'tm4', 'Tom', 'Star', 'Forward', 7);

INSERT INTO matches (match_id, home_team_id, away_team_id, venue_id, match_date, home_score, away_score) VALUES
('m1', 'tm1', 'tm2', 'v1', '2023-09-10', 2, 1),
('m2', 'tm3', 'tm4', 'v3', '2023-09-11', 0, 0),
('m3', 'tm2', 'tm3', 'v2', '2023-09-17', 1, 3),
('m4', 'tm4', 'tm1', 'v1', '2023-09-18', 2, 2);

INSERT INTO stats_log (stat_id, match_id, player_id, goals, assists, minutes_played, yellow_cards, red_cards) VALUES
('s1', 'm1', 'pl1', 2, 0, 90, 0, 0),
('s2', 'm1', 'pl3', 1, 0, 90, 1, 0),
('s3', 'm2', 'pl5', 0, 0, 85, 0, 0),
('s4', 'm3', 'pl5', 2, 1, 90, 0, 0),
('s5', 'm4', 'pl6', 1, 1, 90, 0, 0),
('s6', 'm4', 'pl1', 2, 0, 90, 1, 0);
  `,
  aviation: `
CREATE TABLE airports (
  airport_id TEXT PRIMARY KEY,
  name TEXT,
  city TEXT,
  country TEXT,
  timezone TEXT
);

CREATE TABLE aircraft (
  aircraft_id TEXT PRIMARY KEY,
  model TEXT,
  capacity INTEGER,
  status TEXT
);

CREATE TABLE flights (
  flight_id TEXT PRIMARY KEY,
  aircraft_id TEXT,
  departure_airport_id TEXT,
  arrival_airport_id TEXT,
  scheduled_departure TEXT,
  scheduled_arrival TEXT,
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(aircraft_id),
  FOREIGN KEY (departure_airport_id) REFERENCES airports(airport_id),
  FOREIGN KEY (arrival_airport_id) REFERENCES airports(airport_id)
);

CREATE TABLE flight_status_history (
  status_id TEXT PRIMARY KEY,
  flight_id TEXT,
  status TEXT,
  timestamp TEXT,
  FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

CREATE TABLE crew_assignments (
  assignment_id TEXT PRIMARY KEY,
  flight_id TEXT,
  employee_id TEXT,
  role TEXT,
  FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
);

INSERT INTO airports (airport_id, name, city, country, timezone) VALUES
('JFK', 'John F. Kennedy International', 'New York', 'USA', 'EST'),
('LHR', 'Heathrow Airport', 'London', 'UK', 'GMT'),
('CDG', 'Charles de Gaulle Airport', 'Paris', 'France', 'CET'),
('HND', 'Haneda Airport', 'Tokyo', 'Japan', 'JST'),
('SYD', 'Sydney Kingsford Smith', 'Sydney', 'Australia', 'AEST');

INSERT INTO aircraft (aircraft_id, model, capacity, status) VALUES
('A101', 'Boeing 737', 189, 'Active'),
('A102', 'Airbus A320', 150, 'Active'),
('A103', 'Boeing 777', 396, 'Maintenance'),
('A104', 'Airbus A350', 315, 'Active'),
('A105', 'Boeing 787', 242, 'Grounded');

INSERT INTO flights (flight_id, aircraft_id, departure_airport_id, arrival_airport_id, scheduled_departure, scheduled_arrival) VALUES
('FL001', 'A101', 'JFK', 'LHR', '2024-05-18 22:00:00', '2024-05-19 10:00:00'),
('FL002', 'A102', 'CDG', 'HND', '2024-05-18 14:30:00', '2024-05-19 09:15:00'),
('FL003', 'A104', 'LHR', 'SYD', '2024-05-19 08:00:00', '2024-05-20 14:00:00'),
('FL004', 'A101', 'SYD', 'JFK', '2024-05-20 06:00:00', '2024-05-20 20:30:00');

INSERT INTO flight_status_history (status_id, flight_id, status, timestamp) VALUES
('FS1', 'FL001', 'Scheduled', '2024-05-17 10:00:00'),
('FS2', 'FL001', 'Delayed', '2024-05-18 20:00:00'),
('FS3', 'FL002', 'Boarding', '2024-05-18 13:45:00'),
('FS4', 'FL003', 'Scheduled', '2024-05-18 09:00:00');

INSERT INTO crew_assignments (assignment_id, flight_id, employee_id, role) VALUES
('CA1', 'FL001', 'EMP01', 'Captain'),
('CA2', 'FL001', 'EMP02', 'First Officer'),
('CA3', 'FL001', 'EMP03', 'Flight Attendant'),
('CA4', 'FL002', 'EMP04', 'Captain'),
('CA5', 'FL003', 'EMP05', 'Captain');
  `,
  human_resources: `
CREATE TABLE departments (
  department_id INTEGER PRIMARY KEY,
  name TEXT,
  budget REAL
);

CREATE TABLE stores (
  store_id INTEGER PRIMARY KEY,
  location_city TEXT,
  store_manager_id INTEGER
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  hire_date TEXT,
  department_id INTEGER,
  store_id INTEGER,
  title TEXT,
  employment_type TEXT,
  pay_type TEXT
);

CREATE TABLE payrolls (
  payroll_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  salary REAL,
  hourly_rate REAL,
  bonus REAL,
  pay_period TEXT
);

CREATE TABLE performance_reviews (
  review_id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  rating INTEGER,
  review_date TEXT
);

INSERT INTO departments (department_id, name, budget) VALUES
(1, 'Sales', 5000000),
(2, 'Human Resources', 1500000),
(3, 'Management', 3000000);

INSERT INTO stores (store_id, location_city, store_manager_id) VALUES
(1, 'New York', 4),
(2, 'Los Angeles', 5),
(3, 'Chicago', 6);

INSERT INTO employees (employee_id, first_name, last_name, hire_date, department_id, store_id, title, employment_type, pay_type) VALUES
(1, 'Alice', 'Smith', '2022-01-15', 1, 1, 'Sales Associate', 'Full-Time', 'Hourly'),
(2, 'Bob', 'Jones', '2023-03-22', 1, 1, 'Sales Associate', 'Part-Time', 'Hourly'),
(3, 'Charlie', 'Brown', '2021-11-05', 2, 1, 'HR Generalist', 'Full-Time', 'Salary'),
(4, 'Diana', 'Prince', '2019-06-12', 3, 1, 'Store Manager', 'Full-Time', 'Salary'),
(5, 'Evan', 'Wright', '2020-08-30', 3, 2, 'Store Manager', 'Full-Time', 'Salary'),
(6, 'Fiona', 'Gallagher', '2019-12-01', 3, 3, 'Store Manager', 'Full-Time', 'Salary'),
(7, 'George', 'Miller', '2023-01-10', 1, 2, 'Sales Associate', 'Part-Time', 'Hourly'),
(8, 'Hannah', 'Davis', '2024-02-14', 1, 2, 'Sales Associate', 'Part-Time', 'Hourly'),
(9, 'Ian', 'Moore', '2023-05-18', 1, 3, 'Sales Associate', 'Part-Time', 'Hourly'),
(10, 'Julia', 'Taylor', '2022-09-09', NULL, NULL, 'Pending Placement', 'Full-Time', 'Hourly');

INSERT INTO payrolls (payroll_id, employee_id, salary, hourly_rate, bonus, pay_period) VALUES
(1, 1, NULL, 22.50, 2000, '2024-Q1'),
(2, 2, NULL, 20.00, 1500, '2024-Q1'),
(3, 3, 60000, NULL, 3000, '2024-Q1'),
(4, 4, 85000, NULL, 10000, '2024-Q1'),
(5, 5, 82000, NULL, 8000, '2024-Q1'),
(6, 6, 80000, NULL, 9000, '2024-Q1'),
(7, 7, NULL, 18.00, 1000, '2024-Q1'),
(8, 8, NULL, 18.00, 500, '2024-Q1'),
(9, 9, NULL, 19.50, 1200, '2024-Q1'),
(10, 10, NULL, 16.00, NULL, '2024-Q1');

INSERT INTO performance_reviews (review_id, employee_id, rating, review_date) VALUES
(1, 1, 4, '2023-12-15'),
(2, 2, 3, '2023-12-16'),
(3, 3, 5, '2023-12-10'),
(4, 4, 4, '2023-12-05'),
(5, 5, 3, '2023-12-06'),
(6, 6, 4, '2023-12-07'),
(7, 7, 3, '2024-01-15'),
(8, 9, 4, '2024-01-20');
  `,
  real_estate: `
CREATE TABLE neighborhoods (
  neighborhood_id INTEGER PRIMARY KEY,
  neighborhood_name TEXT,
  min_latitude DECIMAL(9,6),
  max_latitude DECIMAL(9,6),
  min_longitude DECIMAL(9,6),
  max_longitude DECIMAL(9,6),
  boundary_wkt TEXT
);

CREATE TABLE environmental_zones (
  zone_id INTEGER PRIMARY KEY,
  zone_type TEXT,
  boundary_wkt TEXT
);

CREATE TABLE properties (
  property_id INTEGER PRIMARY KEY,
  address TEXT,
  price DECIMAL,
  bedrooms INTEGER,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6)
);

INSERT INTO neighborhoods (neighborhood_id, neighborhood_name, min_latitude, max_latitude, min_longitude, max_longitude, boundary_wkt) VALUES
(1, 'Downtown', 37.7700, 37.7800, -122.4200, -122.4100, 'POLYGON((...))'),
(2, 'Uptown', 37.7800, 37.7900, -122.4100, -122.4000, 'POLYGON((...))'),
(3, 'Suburbs', 37.7500, 37.7700, -122.4500, -122.4200, 'POLYGON((...))');

INSERT INTO environmental_zones (zone_id, zone_type, boundary_wkt) VALUES
(1, 'High-Risk Flood', 'POLYGON((...))'),
(2, 'Special Assessment', 'POLYGON((...))');

INSERT INTO properties (property_id, address, price, bedrooms, latitude, longitude) VALUES
(1, '123 Main St', 500000, 3, 37.7750, -122.4150),
(2, '456 Elm St', 600000, 4, 37.7850, -122.4050),
(3, '789 Oak St', 400000, 2, 37.7600, -122.4300),
(4, '101 Pine St', 700000, 5, 37.7720, -122.4180),
(5, '202 Maple St', 300000, 1, 37.7550, -122.4400),
(6, '303 Cedar St', 800000, 4, 37.7780, -122.4120),
(7, '404 Birch St', 450000, 2, 37.7820, -122.4080),
(8, '505 Walnut St', 550000, 3, 37.7650, -122.4250);
  `
};
