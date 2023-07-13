FROM node:16-bullseye
RUN apt-get -y update --fix-missing
# RUN apt-get -y install git
RUN apt-get -y install make
RUN apt-get install -y npm
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -y install yarn

COPY . /app

EXPOSE 3000
RUN echo "#!/bin/bash\n" > /startscript.sh
RUN echo "cd /app\n" >> /startscript.sh
RUN echo "make dockertest\n" >> /startscript.sh
RUN chmod +x /startscript.sh
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

CMD /startscript.sh
