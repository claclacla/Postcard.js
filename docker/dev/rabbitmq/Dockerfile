FROM rabbitmq:3.7.8

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

RUN apt-get update \ 
  && apt-get install -y python \
  && apt-get install -y net-tools \
  && rabbitmq-plugins enable rabbitmq_management \
  && apt-get install -y wget \
  && wget https://raw.githubusercontent.com/rabbitmq/rabbitmq-management/v3.7.8/bin/rabbitmqadmin \
  && mv rabbitmqadmin /usr/local/bin/ \
  && chmod 744 /usr/local/bin/rabbitmqadmin