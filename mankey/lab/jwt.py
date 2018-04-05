from jose import jwt
token1 = jwt.encode({'key': 'value'}, 'secret', algorithm='HS256')
token2 = jwt.encode({'key': 'value2'}, 'secret', algorithm='HS256')

print token1
print token2 
