import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(username, pass) {
    return 'lol';
    // const user = await this.usersService.findOne(username);
    //
    // if (user?.password !== pass) throw new UnauthorizedException();
    //
    // const payload = { sub: user?.userId, username: user?.username };
    // console.log(payload);
    // return { access_token: await this.jwtService.signAsync(payload) };
  }
}
