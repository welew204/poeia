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
