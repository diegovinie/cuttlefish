```bash
mix phx.gen.schema Player players name:string question:string secret:string
```
After deleting the preceding

Creates a json context
```bash
phx.gen.json Auth Player players nickname:string question:string secret:string
```
mix phx.gen.json Game CardSet cardsets name:string content:string notes:string

mix phx.gen.presence

mix phx.gen.json Game Match matches name:string avg:decimal sd:decimal status_id:integer
