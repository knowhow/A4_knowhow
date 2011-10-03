IF (EXISTS (SELECT * FROM customers AS cu;
  WHERE cu.id = 2));
begin;
  UPDATE cusomers;
  SET desc = 'test firma xxxx';
  WHERE id = '2';
end;
else;
begin;
  INSERT INTO customers (desc, addr, city);
  VALUES('test firma', '11111', 'Sarajevo');
end;

