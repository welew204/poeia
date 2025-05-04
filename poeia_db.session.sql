SELECT id, name, updatedAt, createdAt, typeof(updatedAt), typeof(createdAt) FROM Element;
UPDATE Element SET updatedAt='2025-05-04T20:37:06.065Z' WHERE typeof(updatedAt)="integer";
UPDATE Element SET createdAt='2025-05-03T20:37:06.065Z' WHERE typeof(createdAt)="integer";

UPDATE element
SET
  createdAt = CASE
    WHEN typeof(createdAt) = 'integer' THEN
      substr(
        strftime('%Y-%m-%dT%H:%M:%S.', createdAt / 1000, 'unixepoch') ||
        printf('%03d', createdAt % 1000) || 'Z',
        1, 24
      )
    ELSE createdAt
  END,
  updatedAt = CASE
    WHEN typeof(updatedAt) = 'integer' THEN
      substr(
        strftime('%Y-%m-%dT%H:%M:%S.', updatedAt / 1000, 'unixepoch') ||
        printf('%03d', updatedAt % 1000) || 'Z',
        1, 24
      )
    ELSE updatedAt
  END
WHERE typeof(createdAt) = 'integer' OR typeof(updatedAt) = 'integer';
