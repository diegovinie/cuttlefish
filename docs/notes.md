# Notes

## Dockerization

### Create Dockerfile

### Create docker-compose

### Push docker image

## AWS deploy

### Create Cluster in ECS

### Create Task Definition
This will act such a *docker-compose*
+ Create *phoenix* and *db* containers
+ Containers *hostname* will be *localhost* due *Fargate* limitations.
+ Mount volume binding mode.

### Create load balancer
AWS EC2 -> new Load Balancer -> network balancer -> TCP 80 -> Delete created Security group

### Create Service
AWS ECS -> new Service -> Fargate -> Load Balancer, bind phoenix:80 -> create Security group -> add listener TCP 80

### Redirect to domain
Hostinger -> Domains -> DNS Zone -> new CNAME (Alias) -> subdomain, load balancer DNS
