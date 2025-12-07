import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
  // Use the same default secret as JwtModule (prestasecret) when JWT_SECRET is not set
  secretOrKey: process.env.JWT_SECRET || 'prestasecret',
    });
  }

  async validate(payload: any) {
    const user = await this.usuariosService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // attached to request.user
  }
}
