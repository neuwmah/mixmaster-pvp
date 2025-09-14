-- Enforce máximo de 3 personagens por usuário via trigger

CREATE OR REPLACE FUNCTION enforce_user_characters_limit()
RETURNS trigger AS $$
DECLARE
  char_count INT;
BEGIN
  IF NEW."userId" IS NOT NULL THEN
    SELECT COUNT(*) INTO char_count
    FROM "Character"
    WHERE "userId" = NEW."userId"
      AND (TG_OP <> 'UPDATE' OR id <> OLD.id);

    IF char_count >= 3 THEN
      RAISE EXCEPTION 'User % already has the maximum of 3 characters', NEW."userId";
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_user_characters_limit ON "Character";

CREATE TRIGGER trg_enforce_user_characters_limit
BEFORE INSERT OR UPDATE ON "Character"
FOR EACH ROW
EXECUTE FUNCTION enforce_user_characters_limit();