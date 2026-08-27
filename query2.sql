SELECT id, email, role, roles FROM "user" WHERE role = 'owner' OR role = 'moderator' OR email LIKE '%dahiru%';
