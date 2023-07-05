import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseModel } from '../../shared/models/response';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';
import { User } from '../users/entities/user.entity';
import { UserResponse } from '../../shared/models/user.response';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login to system' })
  @ApiSingleResponse(User)
  async login(
    @Req() request: RequestWithUser,
  ): Promise<ResponseModel<UserResponse>> {
    const { user } = request;
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(request.user.id);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    return new ResponseModel(this.authService.login(user));
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiSingleResponse(User)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseModel<UserResponse>> {
    return new ResponseModel(await this.userService.create(createUserDto));
  }

  @ApiBearerAuth()
  @ApiCookieAuth('Refresh')
  @ApiOperation({ summary: 'Logout from system' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser): Promise<void> {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @ApiBearerAuth()
  @ApiCookieAuth('Refresh')
  @ApiOperation({ summary: 'Get new Refresh token' })
  @ApiSingleResponse(User)
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(
    @Req() request: RequestWithUser,
  ): Promise<ResponseModel<UserResponse>> {
    const { user } = request;
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [refreshTokenCookie]);
    return new ResponseModel(this.authService.login(user));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCookieAuth('Refresh')
  @Post('test')
  test(@Req() request: RequestWithUser) {
    return 'LOL';
  }
}
