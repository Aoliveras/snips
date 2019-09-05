DROP TABLE IF EXISTS snippet;
CREATE TABLE snippet
(
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT,
);

--Seed snippets with data
INSERT INTO
  snippet
  (code, title, description, language, author)
VALUES
  (
    'const america = 1776',
    'freedom',
    'I declared const',
    'JavaScript',
    'Dandy'
  ),
  (
    'const america = 1776',
    'poop',
    'I declared const',
    'JavaScript',
    'Dandy'
  ),
  (
    'const america = 1776',
    'yomomma',
    'I declared const',
    'JavaScript',
    'Dandy'
  ),
  (
    'const america = 1776',
    'freedom',
    'I declared const',
    'JavaScript',
    'Ayana'
  ),
  (
    'const america = 1776',
    'freedom',
    'I declared const',
    'JavaScript',
    'CJ'
  );